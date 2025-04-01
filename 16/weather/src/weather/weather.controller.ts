import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { WeatherService } from './weather.service';

interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

interface WeatherResponse {
  city: string;
  temperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  description: string;
  timestamp: string;
}

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city')
  async getWeather(
    @Param('city') city: string,
    @Req() req: any,
  ): Promise<WeatherResponse> {
    // Rate limiting 체크
    const isAllowed = await this.weatherService.checkRateLimit(req.ip);
    if (!isAllowed) {
      throw new Error('Rate limit exceeded');
    }

    const weatherData = (await this.weatherService.getWeatherData(
      city,
    )) as OpenWeatherResponse;
    return {
      city,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      windSpeed: weatherData.wind.speed,
      description: weatherData.weather[0].description,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('stats/daily/:city')
  async getDailyStats(
    @Param('city') city: string,
    @Query('date') date: string,
  ) {
    return await this.weatherService.getDailyStats(city, new Date(date));
  }

  @Get('stats/weekly/:city')
  async getWeeklyStats(
    @Param('city') city: string,
    @Query('startDate') startDate: string,
  ) {
    return await this.weatherService.getWeeklyStats(city, new Date(startDate));
  }
}
