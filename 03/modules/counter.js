// 모듈 캐싱 예제
let count = 0;

function getCount() {
  return count;
}

function increment() {
  count++;
}

module.exports = {
  getCount,
  increment,
};
