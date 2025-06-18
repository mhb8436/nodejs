// 커스텀 로거 미들웨어
const logger = (req, res, next) => {
  const start = Date.now();

  // 응답이 완료되면 실행될 리스너
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });

  next();
};

module.exports = logger;
