const winston = require('winston');

// 간단한 winston 로거 설정
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        // 콘솔에 출력
        new winston.transports.Console(),
        // 파일에 저장
        new winston.transports.File({ filename: 'app.log' })
    ]
});

// 요청 로깅 미들웨어
const loggingMiddleware = (req, res, next) => {
    const start = Date.now();
    
    // 응답 완료 후 로깅
    res.on('finish', () => {
        const duration = Date.now() - start;
        
        logger.info(`${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
    });

    next();
};

// 에러 로깅 미들웨어
const errorLoggingMiddleware = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    next(err);
};

module.exports = {
    logger,
    loggingMiddleware,
    errorLoggingMiddleware
}; 