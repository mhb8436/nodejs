import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherModule } from './weather/weather.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot(), WeatherModule, PrismaModule],
})
export class AppModule {}
