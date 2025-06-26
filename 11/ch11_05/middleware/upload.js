const multer = require('multer');
const path = require('path');

// 파일 저장 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // uploads 폴더에 저장
    },
    filename: function (req, file, cb) {
        // 파일명 중복 방지: timestamp + 원본파일명
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// 파일 필터링 (이미지 파일만 허용)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('지원하지 않는 파일 형식입니다.'), false);
    }
};

// multer 설정
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB 제한
    }
});

// 단일 파일 업로드
const uploadSingle = upload.single('file');

// 여러 파일 업로드
const uploadMultiple = upload.array('files', 5); // 최대 5개 파일

module.exports = {
    uploadSingle,
    uploadMultiple
}; 