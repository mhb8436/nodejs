import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WeatherController } from './weather.controller';
import { Weather, WeatherSchema } from './schemas/weather.schema';
import { WeatherService } from './weather.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
    CacheModule.register({
      ttl: 300 * 1000, // 5분
      max: 100, // 최대 캐시 항목 수
    }),
    HttpModule,
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
