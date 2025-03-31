// 모듈 캐싱 예제
let count = 0;

const getCount = () => count;
const increment = () => count++;

module.exports = {
  getCount,
  increment,
};
