import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AzureStorageService } from './azure-storage.service';

@Global() // 전역 모듈로 설정하여 어디서든 사용 가능하게 함
@Module({
  imports: [ConfigModule],
  providers: [AzureStorageService],
  exports: [AzureStorageService],
})
export class AzureStorageModule {} 