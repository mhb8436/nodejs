import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CrawlerService } from './crawler.service';
import { CrawlerController } from './crawler.controller';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  providers: [CrawlerService, SchedulerService],
  controllers: [CrawlerController],
  exports: [CrawlerService, SchedulerService],
})
export class CrawlerModule {} 