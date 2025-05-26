import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CrawlerService } from './crawler.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly prisma: PrismaService,
  ) {}

  // 매일 자정에 실행되는 크롤링 작업
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async scheduledCrawling() {
    this.logger.log('일일 크롤링 작업 시작');

    try {
      // 크롤링할 URL 목록 (예시: 네이버 뉴스 메인 페이지의 주요 뉴스)
      const urls = [
        'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=100', // 정치
        'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=101', // 경제
        'https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=102', // 사회
      ];

      for (const url of urls) {
        try {
          // 각 URL에 대해 크롤링 수행
          const result = await this.crawlerService.crawlWebpage(url);
          
          // 크롤링 결과를 데이터베이스에 저장
          await this.prisma.crawledData.create({
            data: {
              url: result.url,
              title: result.title,
              content: result.content,
              crawledAt: new Date(),
              metadata: {
                description: result.description,
                ogImage: result.ogImage,
                images: result.images,
                links: result.links,
              },
            },
          });

          this.logger.log(`URL 크롤링 완료: ${url}`);
          
          // 서버 부하를 줄이기 위해 각 요청 사이에 1초 대기
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          this.logger.error(`URL 크롤링 실패 (${url}): ${error.message}`);
          // 개별 URL 실패는 전체 작업을 중단하지 않음
          continue;
        }
      }

      this.logger.log('일일 크롤링 작업 완료');
    } catch (error) {
      this.logger.error(`크롤링 작업 실패: ${error.message}`);
    }
  }

  // 크롤링 결과 조회 API
  async getCrawledData(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      this.prisma.crawledData.findMany({
        skip,
        take: limit,
        orderBy: {
          crawledAt: 'desc',
        },
      }),
      this.prisma.crawledData.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
} 