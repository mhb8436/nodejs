import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherModule } from './weather/weather.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 60 * 24, // 24시간
      max: 100, // 최대 캐시 항목 수
    }),
    ScheduleModule.forRoot(),
    WeatherModule,
    PrismaModule,
  ],
})
export class AppModule {}
