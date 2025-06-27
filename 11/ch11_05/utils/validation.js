// Joi 라이브러리 불러오기 - 데이터 유효성 검사를 위한 도구입니다.
const Joi = require("joi");

/**
 * 로그인 유효성 검증
 *
 * 이 스키마는 로그인 시 입력된 데이터가 올바른지 확인합니다:
 * 1. 이메일이 올바른 형식인지 확인 (예: user@example.com)
 * 2. 비밀번호가 입력되었는지 확인
 */
const loginSchema = Joi.object({
  // 이메일 검증: 올바른 이메일 형식(@가 포함된)이어야 하고 필수 입력
  email: Joi.string().email().required().messages({
    "string.email": "유효한 이메일 형식이 아닙니다.",
    "string.empty": "이메일은 필수 입력 항목입니다.",
  }),

  // 비밀번호 검증: 필수 입력
  password: Joi.string().required().messages({
    "string.empty": "비밀번호는 필수 입력 항목입니다.",
  }),
});

/**
 * 회원가입 유효성 검증
 *
 * 이 스키마는 회원가입 시 입력된 데이터가 올바른지 확인합니다:
 * 1. 이메일이 올바른 형식인지 확인
 * 2. 비밀번호가 보안 요구사항을 충족하는지 확인
 * 3. 이름이 올바르게 입력되었는지 확인
 */
const registerSchema = Joi.object({
  // 이메일 검증: 올바른 이메일 형식이어야 하고 필수 입력
  email: Joi.string().email().required().messages({
    "string.email": "유효한 이메일 형식이 아닙니다.",
    "string.empty": "이메일은 필수 입력 항목입니다.",
  }),

  // 비밀번호 검증: 8자 이상, 30자 이하, 필수 입력
  password: Joi.string().min(8).max(30).required().messages({
    "string.min": "비밀번호는 최소 8자 이상이어야 합니다.",
    "string.max": "비밀번호는 최대 30자까지 가능합니다.",
    "string.empty": "비밀번호는 필수 입력 항목입니다.",
  }),

  // 이름 검증: 2자 이상, 50자 이하, 필수 입력
  name: Joi.string().min(2).max(50).required().messages({
    "string.min": "이름은 최소 2자 이상이어야 합니다.",
    "string.max": "이름은 최대 50자까지 가능합니다.",
    "string.empty": "이름은 필수 입력 항목입니다.",
  }),
});

// 다른 파일에서 사용할 수 있도록 내보내기
module.exports = {
  loginSchema,
  registerSchema,
};
