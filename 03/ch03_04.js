// validator와 uuid 예제
// npm install validator uuid
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

console.log("\n=== validator 예제 ===");

// 1. 이메일 검증
const email = "test@example.com";
console.log("이메일 검증:", validator.isEmail(email));

// 2. URL 검증
const url = "https://www.example.com";
console.log("URL 검증:", validator.isURL(url));

// 3. IP 주소 검증
const ip = "192.168.1.1";
console.log("IP 주소 검증:", validator.isIP(ip));

// 4. 전화번호 검증
const phone = "010-1234-5678";
console.log("전화번호 검증:", validator.isMobilePhone(phone, "ko-KR"));

// 5. 숫자 검증
const number = "12345";
console.log("숫자 검증:", validator.isNumeric(number));

// 6. 날짜 검증
const date = "2024-03-20";
console.log("날짜 검증:", validator.isDate(date));

// 7. JSON 검증
const json = '{"name": "홍길동", "age": 30}';
console.log("JSON 검증:", validator.isJSON(json));

// 8. 비밀번호 강도 검증
const password = "Password123!";
console.log(
  "비밀번호 강도:",
  validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
);

// 9. 문자열 길이 검증
const str = "Hello World";
console.log("문자열 길이 검증:", validator.isLength(str, { min: 5, max: 20 }));

// 10. 문자열 정규화
const input = "  Hello World  ";
console.log("문자열 정규화:", validator.trim(input));

console.log("\n=== UUID 예제 ===");

// 1. UUID v4 생성
const uuid = uuidv4();
console.log("UUID v4:", uuid);

// 2. UUID 검증
console.log("UUID 유효성:", validator.isUUID(uuid));

// 3. 여러 UUID 생성
const uuids = Array(3)
  .fill()
  .map(() => uuidv4());
console.log("여러 UUID:", uuids);

// 4. UUID 버전 확인
const uuidParts = uuid.split("-");
console.log("UUID 버전:", uuidParts[2][0]);

// 5. UUID를 객체 ID로 사용
const user = {
  id: uuidv4(),
  name: "홍길동",
  email: "hong@example.com",
};
console.log("UUID를 ID로 사용:", user);

// 6. UUID 타임스탬프 추출 (v1의 경우)
const uuidv1 = require("uuid").v1;
const timeBasedUuid = uuidv1();
console.log("시간 기반 UUID:", timeBasedUuid);

// 7. UUID 네임스페이스 생성
const namespace = uuidv4();
console.log("UUID 네임스페이스:", namespace);

// 8. UUID를 파일명으로 사용
const fileName = `${uuidv4()}.txt`;
console.log("UUID 파일명:", fileName);

// 9. UUID를 세션 ID로 사용
const session = {
  id: uuidv4(),
  userId: "user123",
  createdAt: new Date(),
};
console.log("UUID 세션:", session);

// 10. UUID를 트랜잭션 ID로 사용
const transaction = {
  id: uuidv4(),
  amount: 10000,
  status: "completed",
};
console.log("UUID 트랜잭션:", transaction);
