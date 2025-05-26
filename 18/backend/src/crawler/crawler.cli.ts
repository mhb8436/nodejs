import { NestFactory } from '@nestjs/core';
import { CrawlerService } from './crawler.service';
import { AppModule } from '../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const crawlerService = app.get(CrawlerService);

  // 커맨드 라인 인자 파싱
  const args = process.argv.slice(2);
  const command = args[0];
  const url = args[1];

  try {
    switch (command) {
      case 'crawl':
        if (!url) {
          console.error('URL이 필요합니다. 사용법: npm run crawler crawl <url>');
          process.exit(1);
        }
        console.log(`크롤링 시작: ${url}`);
        const result = await crawlerService.crawlWebpage(url);
        console.log('크롤링 결과:', JSON.stringify(result, null, 2));
        break;

      case 'naver-news':
        if (!url) {
          console.error('URL이 필요합니다. 사용법: npm run crawler naver-news <url>');
          process.exit(1);
        }
        console.log(`네이버 뉴스 크롤링 시작: ${url}`);
        const newsResult = await crawlerService.crawlNaverNews(url);
        console.log('크롤링 결과:', JSON.stringify(newsResult, null, 2));
        break;

      case 'extract':
        if (!url || !args[2]) {
          console.error('URL과 셀렉터가 필요합니다. 사용법: npm run crawler extract <url> <selector>');
          process.exit(1);
        }
        const selectors = {
          [args[2]]: args[3] || args[2], // 셀렉터 이름이 주어지지 않은 경우 셀렉터 자체를 키로 사용
        };
        console.log(`데이터 추출 시작: ${url}`);
        const extractResult = await crawlerService.extractDataBySelector(url, selectors);
        console.log('추출 결과:', JSON.stringify(extractResult, null, 2));
        break;

      default:
        console.log(`
사용 가능한 명령어:
  crawl <url>              - 웹페이지 크롤링
  naver-news <url>         - 네이버 뉴스 크롤링
  extract <url> <selector> - 특정 셀렉터로 데이터 추출

예시:
  npm run crawler crawl https://example.com
  npm run crawler naver-news https://news.naver.com/...
  npm run crawler extract https://example.com "h1" "제목"
        `);
    }
  } catch (error) {
    console.error('에러 발생:', error.message);
  } finally {
    await app.close();
  }
}

bootstrap(); 