// npm install moment dayjs validator
const moment = require("moment");
const _ = require("lodash");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");
const CryptoJS = require("crypto-js");

// 1. moment.js 예제
console.log("=== moment.js 예제 ===");
const now = moment();
console.log("현재 시간:", now.format("YYYY-MM-DD HH:mm:ss"));
console.log(
  "한국 시간:",
  now.utcOffset("+09:00").format("YYYY-MM-DD HH:mm:ss")
);
console.log("3일 후:", now.add(3, "days").format("YYYY-MM-DD"));

// 2. lodash 예제
console.log("\n=== lodash 예제 ===");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(
  "짝수만 필터링:",
  _.filter(numbers, (n) => n % 2 === 0)
);
console.log("배열 청크:", _.chunk(numbers, 3));
console.log("배열 중복 제거:", _.uniq([1, 2, 2, 3, 3, 4, 5]));

// 3. validator 예제
console.log("\n=== validator 예제 ===");
const email = "test@example.com";
const phone = "010-1234-5678";
console.log("이메일 유효성:", validator.isEmail(email));
console.log("전화번호 유효성:", validator.isMobilePhone(phone, "ko-KR"));
console.log("URL 유효성:", validator.isURL("https://www.example.com"));

// 4. uuid 예제
console.log("\n=== uuid 예제 ===");
const id = uuidv4();
console.log("생성된 UUID:", id);
console.log("UUID 유효성:", validator.isUUID(id));

// 5. crypto-js 예제
console.log("\n=== crypto-js 예제 ===");
const secretKey = "my-secret-key";
const text = "안녕하세요!";
const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey).toString(
  CryptoJS.enc.Utf8
);
console.log("원본 텍스트:", text);
console.log("암호화:", encrypted);
console.log("복호화:", decrypted);
