/**
 * TypeScript 인터페이스와 타입 별칭 학습
 *
 * 이 파일에서는 TypeScript의 인터페이스와 타입 별칭을 학습합니다:
 * - 인터페이스 정의와 구현
 * - 선택적 프로퍼티
 * - 읽기 전용 프로퍼티
 * - 함수 타입
 * - 클래스 타입
 * - 타입 별칭
 * - 인터페이스 확장
 */

// 1. 기본 인터페이스
interface User {
  name: string;
  age: number;
}
const user: User = {
  name: "홍길동",
  age: 25,
};
console.log("User:", user);

// 2. 선택적 프로퍼티
interface ColorConfig {
  color?: string;
  width?: number;
}
const config: ColorConfig = {
  color: "red",
};
console.log("Config:", config);

// 3. 읽기 전용 프로퍼티
interface ReadOnlyPoint {
  readonly x: number;
  readonly y: number;
}
const point: ReadOnlyPoint = {
  x: 10,
  y: 20,
};
console.log("ReadOnlyPoint:", point);

// 4. 함수 타입
interface SearchFunc {
  (source: string, subString: string): boolean;
}
const search: SearchFunc = (source: string, subString: string): boolean => {
  return source.includes(subString);
};
console.log("Search result:", search("Hello World", "World"));

// 5. 클래스 타입
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}
class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
}
const clock = new Clock();
console.log("Clock current time:", clock.currentTime);

// 6. 타입 별칭
type PointType = {
  x: number;
  y: number;
};
const pointType: PointType = {
  x: 30,
  y: 40,
};
console.log("PointType:", pointType);

// 7. 인터페이스 확장
interface Shape {
  color: string;
}
interface Square extends Shape {
  sideLength: number;
}
const square1: Square = {
  color: "blue",
  sideLength: 10,
};
console.log("Square:", square1);

// 실행 예시
console.log("=== TypeScript 인터페이스와 타입 별칭 예제 ===");
