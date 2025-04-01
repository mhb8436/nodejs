import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
}

interface WeatherResponse {
  city: string;
  temperature: number;
  humidity: number;
  description: string;
  timestamp: string;
}

@Controller('weather')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all')
  async getAllWeather() {
    return await this.appService.getAllWeatherData();
  }

  @Get(':city')
  async getWeather(@Param('city') city: string): Promise<WeatherResponse> {
    const weatherData = (await this.appService.getWeatherData(
      city,
    )) as OpenWeatherResponse;
    return {
      city,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      description: weatherData.weather[0].description,
      timestamp: new Date().toISOString(),
    };
  }
}
