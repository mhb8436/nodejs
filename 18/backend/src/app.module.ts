import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CrawlerModule } from './crawler/crawler.module';
import { ChatModule } from './chat/chat.module';
import { AzureStorageModule } from './azure-storage/azure-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    BoardModule,
    CrawlerModule,
    ChatModule,
    AzureStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
