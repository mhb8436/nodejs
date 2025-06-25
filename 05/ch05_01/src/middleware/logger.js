const winston = require('winston');

// Winston 로거 설정
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize(),
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

// 디버깅용 로거 함수들
const debug = (message, meta = {}) => logger.debug(message, meta);
const info = (message, meta = {}) => logger.info(message, meta);
const warn = (message, meta = {}) => logger.warn(message, meta);
const error = (message, meta = {}) => logger.error(message, meta);

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

// 미들웨어와 로거 인스턴스 모두 내보내기
module.exports = loggerMiddleware;
module.exports.logger = logger;
module.exports.debug = debug;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;

