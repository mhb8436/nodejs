import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CrawlerModule } from './crawler/crawler.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    BoardModule,
    CrawlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
