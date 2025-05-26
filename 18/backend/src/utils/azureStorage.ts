import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error('AZURE_STORAGE_CONNECTION_STRING is not defined');
}

if (!process.env.AZURE_STORAGE_CONTAINER_NAME) {
  throw new Error('AZURE_STORAGE_CONTAINER_NAME is not defined');
}

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_STORAGE_CONTAINER_NAME
);

export async function uploadFileToBlob(
  file: Express.Multer.File
): Promise<{ url: string; fileName: string }> {
  const blobName = `${uuidv4()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  await blockBlobClient.uploadData(file.buffer, {
    blobHTTPHeaders: { blobContentType: file.mimetype },
  });

  return {
    url: blockBlobClient.url,
    fileName: file.originalname,
  };
}

export async function deleteBlob(blobUrl: string): Promise<void> {
  const blobName = blobUrl.split('/').pop();
  if (!blobName) {
    throw new Error('Invalid blob URL');
  }
  
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.delete();
} 