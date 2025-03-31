// ES 모듈
export function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

export function multiply(...numbers) {
  return numbers.reduce((acc, curr) => acc * curr, 1);
}
