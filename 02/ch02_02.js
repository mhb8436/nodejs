const path = require("path");

// 경로 결합
const fullPath = path.join(__dirname, "files", "test.txt");
console.log("전체 경로:", fullPath);

// 경로 분리
const pathParts = path.parse(fullPath);
console.log("경로 분리:", pathParts);

// 파일 확장자
const ext = path.extname("test.txt");
console.log("확장자:", ext);

// 상대 경로를 절대 경로로 변환
const absolutePath = path.resolve("test.txt");
console.log("절대 경로:", absolutePath);

// 경로 정규화
const normalizedPath = path.normalize("/foo/bar//baz/asdf/quux/..");
console.log("정규화된 경로:", normalizedPath);

// 상대 경로 계산
const relativePath = path.relative("/foo/bar", "/foo/bar/baz");
console.log("상대 경로:", relativePath);

for (var i = 0; i < 10; i++) {
  console.log("file" + (i + 1));
}

console.log("------------");

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.forEach((i) => {
  console.log(`file${i}`);
});

console.log("------------");

Array.from({ length: 10 }, (_, i) => {
  console.log("file" + (i + 1));
});

console.log("------------");

const arr2 = [...Array(10).keys()];
arr2.forEach((i) => {
  console.log(`file${i + 1}`);
});
