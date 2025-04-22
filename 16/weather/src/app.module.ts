import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherModule } from './weather/weather.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 300 * 1000, // 5분
      max: 100, // 최대 캐시 항목 수
    }),
    ScheduleModule.forRoot(),
    WeatherModule,
    PrismaModule,
  ],
})
export class AppModule {}
