import multer from 'multer';
import { Request } from 'express';
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

// Azure Blob Storage를 사용하는 커스텀 스토리지 설정
const azureStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // 임시 디렉토리 사용 (파일은 바로 Azure로 업로드됨)
    cb(null, '/tmp');
  },
  filename: function (req, file, cb) {
    // 파일명 생성 (UUID + 원본 파일명)
    const uniqueFilename = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFilename);
  }
});

// 파일 필터 설정
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // 허용할 파일 타입 설정 (예: 이미지, PDF 등)
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('지원하지 않는 파일 형식입니다.'));
  }
};

// 파일 업로드 후 Azure Blob Storage로 이동하는 미들웨어
const uploadToAzure = async (req: Request, res: Response, next: Function) => {
  if (!req.files || !Array.isArray(req.files)) {
    return next();
  }

  try {
    const uploadPromises = (req.files as Express.Multer.File[]).map(async (file) => {
      const blobName = file.filename; // multer.diskStorage에서 생성한 파일명
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // 파일을 Azure Blob Storage에 업로드
      await blockBlobClient.uploadFile(file.path, {
        blobHTTPHeaders: { blobContentType: file.mimetype }
      });

      // 파일 URL 저장
      file['url'] = blockBlobClient.url;

      // 임시 파일 삭제
      const fs = require('fs');
      fs.unlinkSync(file.path);
    });

    await Promise.all(uploadPromises);
    next();
  } catch (error) {
    next(error);
  }
};

// Multer 설정
const upload = multer({
  storage: azureStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Multer와 Azure 업로드 미들웨어를 결합
export const uploadMiddleware = [upload.array('files', 5), uploadToAzure];

export default uploadMiddleware; 