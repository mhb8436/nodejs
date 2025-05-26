import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { SchedulerService } from './scheduler.service';

class CrawlWebpageDto {
  url: string;
}

class ExtractDataDto {
  url: string;
  selectors: Record<string, string>;
}

@Controller('crawler')
export class CrawlerController {
  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly schedulerService: SchedulerService,
  ) {}

  // 기본 웹페이지 크롤링
  @Post('crawl')
  async crawlWebpage(@Body() dto: CrawlWebpageDto) {
    return this.crawlerService.crawlWebpage(dto.url);
  }

  // 특정 셀렉터로 데이터 추출
  @Post('extract')
  async extractData(@Body() dto: ExtractDataDto) {
    return this.crawlerService.extractDataBySelector(dto.url, dto.selectors);
  }

  // 네이버 뉴스 크롤링
  @Get('naver-news')
  async crawlNaverNews(@Query('url') url: string) {
    return this.crawlerService.crawlNaverNews(url);
  }

  // 크롤링된 데이터 조회
  @Get('data')
  async getCrawledData(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.schedulerService.getCrawledData(page, limit);
  }
} 