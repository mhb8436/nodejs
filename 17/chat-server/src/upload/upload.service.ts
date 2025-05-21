import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {}

  getFileUrl(filename: string): string {
    const baseUrl = this.configService.get('BASE_URL') || 'http://localhost:3000';
    return `${baseUrl}/uploads/${filename}`;
  }

  getFileType(mimetype: string): string {
    if (mimetype.startsWith('image/')) {
      return 'image';
    }
    return 'file';
  }

  getFileMetadata(file: Express.Multer.File) {
    return {
      fileName: file.originalname,
      fileSize: file.size,
      mimeType: file.mimetype,
    };
  }
} 