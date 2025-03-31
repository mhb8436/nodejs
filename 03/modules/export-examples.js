// 다양한 내보내기 방식 예제

// 1. 기본 내보내기
const defaultExport = {
  message: "이것은 기본 내보내기입니다.",
  timestamp: new Date(),
};

// 2. 이름이 있는 내보내기
const namedExport = {
  type: "named",
  value: 42,
};

// 3. 여러 가지 내보내기
const multipleExports = {
  first: "첫 번째",
  second: "두 번째",
  third: "세 번째",
};

module.exports = defaultExport;
module.exports.namedExport = namedExport;
Object.assign(module.exports, multipleExports);
