const fs = require("fs");
const { Transform } = require("stream");

// 파일 스트림 읽기
const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

// 스트림 파이프
readStream.pipe(writeStream);

// 커스텀 변환 스트림
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

// 스트림 체이닝
fs.createReadStream("input.txt")
  .pipe(upperCaseTransform)
  .pipe(fs.createWriteStream("uppercase.txt"));

// 스트림 이벤트
readStream.on("data", (chunk) => {
  console.log("데이터 청크:", chunk.toString());
});

readStream.on("end", () => {
  console.log("스트림 읽기 완료");
});

readStream.on("error", (err) => {
  console.error("스트림 에러:", err);
});
