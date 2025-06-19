const winston = require('winston');

// Winston 로거 설정
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    // 콘솔에 로그 출력
    new winston.transports.Console(),
    // 파일에 로그 저장 (선택적)
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

// 커스텀 로거 미들웨어
const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  // 응답이 완료되면 실행될 리스너
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });

  next();
};

module.exports = loggerMiddleware;

