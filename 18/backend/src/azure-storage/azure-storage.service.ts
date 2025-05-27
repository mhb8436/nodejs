import { Injectable } from '@nestjs/common';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureStorageService {
  private readonly containerClient: ContainerClient;

  constructor(private readonly configService: ConfigService) {
    const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
    const containerName = this.configService.get<string>('AZURE_STORAGE_CONTAINER_NAME');

    if (!connectionString) {
      throw new Error('AZURE_STORAGE_CONNECTION_STRING is not defined');
    }
    if (!containerName) {
      throw new Error('AZURE_STORAGE_CONTAINER_NAME is not defined');
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    this.containerClient = blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string; fileName: string }> {
    const blobName = `${uuidv4()}-${file.originalname}`;
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    return {
      url: blockBlobClient.url,
      fileName: file.originalname,
    };
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<Array<{ url: string; fileName: string }>> {
    const uploadPromises = files.map(file => this.uploadFile(file));
    return Promise.all(uploadPromises);
  }

  async deleteBlob(blobUrl: string): Promise<void> {
    const blobName = blobUrl.split('/').pop();
    if (!blobName) {
      throw new Error('Invalid blob URL');
    }
    
    const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
  }
} 