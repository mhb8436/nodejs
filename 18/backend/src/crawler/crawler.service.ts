import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  // 기본 웹페이지 크롤링
  async crawlWebpage(url: string) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      // 기본적인 메타데이터 추출
      const title = $('title').text();
      const description = $('meta[name="description"]').attr('content') || '';
      const ogImage = $('meta[property="og:image"]').attr('content') || '';
      
      // 본문 내용 추출 (예시: article 태그나 main 태그 내의 텍스트)
      const content = $('article, main').text().trim() || $('body').text().trim();
      
      // 모든 이미지 URL 추출
      const images = $('img')
        .map((_, el) => $(el).attr('src'))
        .get()
        .filter(src => src && !src.startsWith('data:'));

      // 모든 링크 추출
      const links = $('a')
        .map((_, el) => ({
          text: $(el).text().trim(),
          href: $(el).attr('href'),
        }))
        .get()
        .filter(link => link.href && !link.href.startsWith('javascript:'));

      return {
        url,
        title,
        description,
        ogImage,
        content: content.substring(0, 1000) + '...', // 내용이 너무 길 수 있으므로 제한
        images,
        links,
        crawledAt: new Date(),
      };
    } catch (error) {
      throw new Error(`크롤링 실패: ${error.message}`);
    }
  }

  // 특정 셀렉터로 데이터 추출
  async extractDataBySelector(url: string, selectors: Record<string, string>) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      const result: Record<string, string | string[]> = {};
      
      for (const [key, selector] of Object.entries(selectors)) {
        const elements = $(selector);
        
        if (elements.length > 1) {
          // 여러 요소가 있는 경우 배열로 반환
          result[key] = elements
            .map((_, el) => $(el).text().trim())
            .get()
            .filter(text => text);
        } else {
          // 단일 요소인 경우 문자열로 반환
          result[key] = elements.text().trim();
        }
      }

      return {
        url,
        data: result,
        crawledAt: new Date(),
      };
    } catch (error) {
      throw new Error(`데이터 추출 실패: ${error.message}`);
    }
  }

  // 네이버 뉴스 크롤링 예제
  async crawlNaverNews(url: string) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      const $ = cheerio.load(response.data);

      // 네이버 뉴스 특화 데이터 추출
      const title = $('.article_info h3').text().trim();
      const content = $('.article_body').text().trim();
      const press = $('.press_logo img').attr('alt') || '';
      const date = $('.article_info .date').text().trim();
      const reporter = $('.article_info .reporter').text().trim();
      
      // 관련 뉴스 링크 추출
      const relatedNews = $('.related_news a')
        .map((_, el) => ({
          title: $(el).text().trim(),
          url: $(el).attr('href'),
        }))
        .get();

      return {
        url,
        title,
        content: content.substring(0, 1000) + '...',
        press,
        date,
        reporter,
        relatedNews,
        crawledAt: new Date(),
      };
    } catch (error) {
      throw new Error(`네이버 뉴스 크롤링 실패: ${error.message}`);
    }
  }
} 