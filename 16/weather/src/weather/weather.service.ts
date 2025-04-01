import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Weather, WeatherDocument } from './schemas/weather.schema';

@Injectable()
export class WeatherService {
  private readonly CACHE_TTL = 300; // 5분

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
    @InjectModel(Weather.name)
    private weatherModel: Model<WeatherDocument>,
    private readonly configService: ConfigService,
  ) {}

  private async fetchAndCacheWeatherData() {
    const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
    if (!apiKey) {
      console.error('OPENWEATHER_API_KEY is not defined');
      return;
    }

    try {
      const cities = ['Seoul', 'Busan', 'Incheon'];
      for (const city of cities) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await firstValueFrom(this.httpService.get(url));

        // Redis에 실시간 데이터 캐싱
        await this.cacheManager.set(
          `weather:realtime:${city}`,
          response.data,
          this.CACHE_TTL * 1000,
        );

        // MongoDB에 데이터 저장
        const weatherData = new this.weatherModel({
          city,
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          pressure: response.data.main.pressure,
          windSpeed: response.data.wind.speed,
          description: response.data.weather[0].description,
          timestamp: new Date(),
        });
        await weatherData.save();
      }
    } catch (error) {
      console.error('날씨 데이터 가져오기 실패:', error);
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async every30SecondsFetchAndCacheWeatherData() {
    await this.fetchAndCacheWeatherData();
  }

  async getWeatherData(city: string) {
    // Redis에서 실시간 데이터 확인
    const cachedData = await this.cacheManager.get(`weather:realtime:${city}`);
    if (cachedData) {
      return cachedData;
    }

    // Redis에 없으면 MongoDB에서 최신 데이터 조회
    const latestData = await this.weatherModel
      .findOne({ city })
      .sort({ timestamp: -1 })
      .limit(1);

    if (latestData) {
      // MongoDB 데이터를 Redis에 캐싱
      await this.cacheManager.set(
        `weather:realtime:${city}`,
        latestData,
        this.CACHE_TTL * 1000,
      );
    }

    return latestData;
  }

  async getDailyStats(city: string, date: Date) {
    const cacheKey = `weather:stats:daily:${city}:${date.toISOString().split('T')[0]}`;

    // Redis에서 캐시된 통계 확인
    const cachedStats = await this.cacheManager.get(cacheKey);
    if (cachedStats) {
      return cachedStats;
    }

    // MongoDB에서 통계 계산
    const stats = await this.weatherModel.aggregate([
      {
        $match: {
          city,
          timestamp: {
            $gte: new Date(date.setHours(0, 0, 0, 0)),
            $lte: new Date(date.setHours(23, 59, 59, 999)),
          },
        },
      },
      {
        $group: {
          _id: null,
          avgTemperature: { $avg: '$temperature' },
          maxTemperature: { $max: '$temperature' },
          minTemperature: { $min: '$temperature' },
          avgHumidity: { $avg: '$humidity' },
          count: { $sum: 1 },
        },
      },
    ]);

    // 계산된 통계를 Redis에 캐싱 (1시간)
    if (stats.length > 0) {
      await this.cacheManager.set(cacheKey, stats[0], 3600 * 1000);
    }

    return stats[0] || null;
  }

  async getWeeklyStats(city: string, startDate: Date) {
    const cacheKey = `weather:stats:weekly:${city}:${startDate.toISOString().split('T')[0]}`;

    // Redis에서 캐시된 통계 확인
    const cachedStats = await this.cacheManager.get(cacheKey);
    if (cachedStats) {
      return cachedStats;
    }

    // MongoDB에서 통계 계산
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    const stats = await this.weatherModel.aggregate([
      {
        $match: {
          city,
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          avgTemperature: { $avg: '$temperature' },
          avgHumidity: { $avg: '$humidity' },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // 계산된 통계를 Redis에 캐싱 (1시간)
    if (stats.length > 0) {
      await this.cacheManager.set(cacheKey, stats, 3600 * 1000);
    }

    return stats;
  }

  async checkRateLimit(ip: string): Promise<boolean> {
    const key = `rate_limit:${ip}`;
    const limit = 100; // 1시간당 최대 요청 수
    const window = 3600; // 1시간

    const current = (await this.cacheManager.get<number>(key)) || 0;
    if (current >= limit) {
      return false;
    }

    await this.cacheManager.set(key, current + 1, window * 1000);
    return true;
  }
}
