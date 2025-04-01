import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
  private readonly CACHE_TTL = 60; // 1분

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {
    // this.startWeatherDataFetching();
  }

  // private async startWeatherDataFetching() {
  //   // 1분마다 날씨 데이터 업데이트
  //   setInterval(async () => {
  //     await this.fetchAndCacheWeatherData();
  //   }, 60000);

  //   // 초기 데이터 가져오기
  //   await this.fetchAndCacheWeatherData();
  // }

  private async fetchAndCacheWeatherData() {
    try {
      const cities = ['Seoul', 'Busan', 'Incheon']; // 예시 도시들
      console.log(this.OPENWEATHER_API_KEY);
      for (const city of cities) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.OPENWEATHER_API_KEY}&units=metric`;
        const response = await firstValueFrom(this.httpService.get(url));

        await this.cacheManager.set(
          `weather_${city}`,
          response.data,
          this.CACHE_TTL * 1000,
        );
      }
    } catch (error) {
      console.error('날씨 데이터 가져오기 실패:', error);
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async every10SecondsFetchAndCacheWeatherData() {
    await this.fetchAndCacheWeatherData();
  }

  async getWeatherData(city: string) {
    return await this.cacheManager.get(`weather_${city}`);
  }

  async getAllWeatherData() {
    const cities = ['Seoul', 'Busan', 'Incheon'];
    const weatherData = [];
    for (const city of cities) {
      const data = await this.cacheManager.get(`weather_${city}`);
      weatherData.push(data);
    }
    return weatherData;
  }
}
