// math.test.js

const { sum, subtract } = require('./math');

test('sum 함수가 정확히 더하는지', () => {
  expect(sum(1, 2)).toBe(3);
  expect(sum(-1, 1)).toBe(0);
});

test('subtract 함수가 정확히 빼는지', () => {
  expect(subtract(3, 1)).toBe(2);
  expect(subtract(1, -1)).toBe(2);
});

