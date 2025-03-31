const buffer = require("buffer");

// Buffer 생성
const buf1 = Buffer.from("Hello World");
console.log("문자열로 생성:", buf1.toString());

const buf2 = Buffer.from([1, 2, 3, 4, 5]);
console.log("배열로 생성:", buf2);

const buf3 = Buffer.alloc(5);
console.log("빈 버퍼 생성:", buf3);

// Buffer 조작
const buf4 = Buffer.from("Hello");
const buf5 = Buffer.from("World");
const combined = Buffer.concat([buf4, buf5]);
console.log("버퍼 결합:", combined.toString());

// Buffer 비교
console.log("버퍼 비교:", Buffer.compare(buf4, buf5));

// Buffer 슬라이싱
const sliced = buf1.slice(0, 5);
console.log("버퍼 슬라이싱:", sliced.toString());

// Buffer 인코딩/디코딩
const str = "안녕하세요";
const encoded = Buffer.from(str).toString("base64");
console.log("Base64 인코딩:", encoded);

const decoded = Buffer.from(encoded, "base64").toString("utf8");
console.log("Base64 디코딩:", decoded);
