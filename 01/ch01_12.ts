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

// 2. 선택적 프로퍼티
interface ColorConfig {
  color?: string;
  width?: number;
}

// 3. 읽기 전용 프로퍼티
interface ReadOnlyPoint {
  readonly x: number;
  readonly y: number;
}

// 4. 함수 타입
interface SearchFunc {
  (source: string, subString: string): boolean;
}

// 5. 클래스 타입
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

// 6. 타입 별칭
type PointType = {
  x: number;
  y: number;
};

// 7. 인터페이스 확장
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

// 8. 인터페이스 구현
class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
}

// 실행 예시
console.log("=== TypeScript 인터페이스와 타입 별칭 예제 ===");

// User 인터페이스 사용
const user: User = {
  name: "홍길동",
  age: 25,
};
console.log("User:", user);

// Config 인터페이스 사용
const config: ColorConfig = {
  color: "red",
};
console.log("Config:", config);

// ReadOnlyPoint 인터페이스 사용
const point: ReadOnlyPoint = {
  x: 10,
  y: 20,
};
console.log("ReadOnlyPoint:", point);

// PointType 타입 사용
const pointType: PointType = {
  x: 30,
  y: 40,
};
console.log("PointType:", pointType);

// SearchFunc 인터페이스 사용
const search: SearchFunc = (source: string, subString: string): boolean => {
  return source.includes(subString);
};
console.log("Search result:", search("Hello World", "World"));

// Clock 클래스 사용
const clock = new Clock();
console.log("Clock current time:", clock.currentTime);
