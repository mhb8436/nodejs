// ES 모듈
export const sum = (...numbers) => numbers.reduce((acc, curr) => acc + curr, 0);
export const multiply = (...numbers) =>
  numbers.reduce((acc, curr) => acc * curr, 1);
