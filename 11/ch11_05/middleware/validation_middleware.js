/**
 * 유효성 검증 미들웨어
 * 
 * 이 파일은 사용자가 입력한 데이터가 유효한지 검사하는 미들웨어를 제공합니다.
 * 미들웨어는 요청이 컨트롤러에 도달하기 전에 실행되는 함수입니다.
 */

// validation.js에서 정의한 검증 스키마를 가져옵니다.
const { loginSchema, registerSchema } = require('../utils/validation');

/**
 * 로그인 유효성 검증 미들웨어
 * 
 * 이 미들웨어는 로그인 요청이 유효한지 확인합니다.
 * 1. 이메일이 유효한 형식인지 검사
 * 2. 비밀번호가 제공되었는지 검사
 * 
 * @param {object} req - Express 요청 객체 (req.body에 사용자 입력이 들어있음)
 * @param {object} res - Express 응답 객체
 * @param {function} next - 다음 미들웨어나 컨트롤러로 이동하는 함수
 */
const validateLogin = (req, res, next) => {
  // loginSchema를 사용해서 입력 데이터(req.body)를 검증합니다.
  const { error } = loginSchema.validate(req.body);
  
  // 유효성 검사에서 오류가 발생한 경우
  if (error) {
    // 400 Bad Request 응답과 함께 오류 메시지를 반환합니다.
    return res.status(400).json({ 
      error: true, 
      message: error.details[0].message // 첫 번째 발생한 오류 메시지
    });
  }
  
  // 유효성 검사가 통과하면 다음 미들웨어나 컨트롤러로 이동합니다.
  next();
};

/**
 * 회원가입 유효성 검증 미들웨어
 * 
 * 이 미들웨어는 회원가입 요청이 유효한지 확인합니다.
 * 1. 이메일이 유효한 형식인지 검사
 * 2. 비밀번호가 안전한지 검사 (길이, 복잡성 등)
 * 3. 이름이 적절한지 검사
 * 
 * @param {object} req - Express 요청 객체
 * @param {object} res - Express 응답 객체
 * @param {function} next - 다음 미들웨어나 컨트롤러로 이동하는 함수
 */
const validateRegister = (req, res, next) => {
  // registerSchema를 사용해서 입력 데이터(req.body)를 검증합니다.
  const { error } = registerSchema.validate(req.body);
  
  // 유효성 검사에서 오류가 발생한 경우
  if (error) {
    // 400 Bad Request 응답과 함께 오류 메시지를 반환합니다.
    return res.status(400).json({ 
      error: true, 
      message: error.details[0].message // 첫 번째 발생한 오류 메시지
    });
  }
  
  // 유효성 검사가 통과하면 다음 미들웨어나 컨트롤러로 이동합니다.
  next();
};

// 다른 파일에서 사용할 수 있도록 함수들을 내보냅니다.
module.exports = {
  validateLogin,
  validateRegister
};

