import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AzureStorageService } from './azure-storage.service';

@Injectable()
export class AzureUploadInterceptor implements NestInterceptor {
  constructor(private readonly azureStorageService: AzureStorageService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const files = request.files;

    if (files && files.length > 0) {
      const uploadedFiles = await this.azureStorageService.uploadFiles(files);
      
      // 업로드된 파일 정보를 request 객체에 추가
      request.uploadedFiles = uploadedFiles.map((file, index) => ({
        ...files[index],
        url: file.url,
      }));
    }

    return next.handle();
  }
} 