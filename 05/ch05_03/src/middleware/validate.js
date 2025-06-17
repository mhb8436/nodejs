// 유효성 검사 미들웨어 생성 함수
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "fail",
        message: "유효하지 않은 요청 데이터입니다.",
        errors: error.details.map((detail) => ({
          field: detail.path[0],
          message: detail.message,
        })),
      });
    }

    next();
  };
};

module.exports = validate;
