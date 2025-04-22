import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

interface WeatherStats {
  temperatures: number[];
  humidities: number[];
}

@Injectable()
export class WeatherService {
  private readonly CACHE_TTL = 300; // 5분

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
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

        // Prisma를 사용하여 데이터 저장
        await this.prisma.weather.create({
          data: {
            city,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            pressure: response.data.main.pressure,
            windSpeed: response.data.wind.speed,
            description: response.data.weather[0].description,
            timestamp: new Date(),
          },
        });
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

    // Redis에 없으면 Prisma에서 최신 데이터 조회
    const latestData = await this.prisma.weather.findFirst({
      where: { city },
      orderBy: { timestamp: 'desc' },
    });

    if (latestData) {
      // Prisma 데이터를 Redis에 캐싱
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

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Prisma를 사용하여 통계 계산
    const weatherData = await this.prisma.weather.findMany({
      where: {
        city,
        timestamp: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    const stats = {
      avgTemperature:
        weatherData.reduce((acc, curr) => acc + curr.temperature, 0) /
        weatherData.length,
      maxTemperature: Math.max(...weatherData.map((w) => w.temperature)),
      minTemperature: Math.min(...weatherData.map((w) => w.temperature)),
      avgHumidity:
        weatherData.reduce((acc, curr) => acc + curr.humidity, 0) /
        weatherData.length,
      count: weatherData.length,
    };

    // 계산된 통계를 Redis에 캐싱 (1시간)
    if (weatherData.length > 0) {
      await this.cacheManager.set(cacheKey, stats, 3600 * 1000);
    }

    return stats;
  }

  async getWeeklyStats(city: string, startDate: Date) {
    const cacheKey = `weather:stats:weekly:${city}:${startDate.toISOString().split('T')[0]}`;

    // Redis에서 캐시된 통계 확인
    const cachedStats = await this.cacheManager.get(cacheKey);
    if (cachedStats) {
      return cachedStats;
    }

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    // Prisma를 사용하여 통계 계산
    const weatherData = await this.prisma.weather.findMany({
      where: {
        city,
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    // 날짜별로 데이터 그룹화
    const stats: Record<string, WeatherStats> = weatherData.reduce(
      (acc, curr) => {
        const date = curr.timestamp.toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = {
            temperatures: [],
            humidities: [],
          };
        }
        acc[date].temperatures.push(curr.temperature);
        acc[date].humidities.push(curr.humidity);
        return acc;
      },
      {} as Record<string, WeatherStats>,
    );

    // 각 날짜별 평균 계산
    const result = Object.entries(stats).map(([date, data]) => ({
      _id: date,
      avgTemperature:
        data.temperatures.reduce((a, b) => a + b, 0) / data.temperatures.length,
      avgHumidity:
        data.humidities.reduce((a, b) => a + b, 0) / data.humidities.length,
    }));

    // 계산된 통계를 Redis에 캐싱 (1시간)
    if (result.length > 0) {
      await this.cacheManager.set(cacheKey, result, 3600 * 1000);
    }

    return result;
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
