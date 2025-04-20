/**
 * TypeScript 함수와 제네릭 학습
 *
 * 이 파일에서는 TypeScript의 함수와 제네릭을 학습합니다:
 * - 함수 타입
 * - 선택적 매개변수
 * - 기본 매개변수
 * - 나머지 매개변수
 * - 함수 오버로드
 * - 제네릭 함수
 * - 제네릭 인터페이스
 * - 제네릭 클래스
 */

// 1. 기본 함수 타입
function add(x: number, y: number): number {
  return x + y;
}
console.log("Add:", add(5, 3));

// 2. 선택적 매개변수
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}
console.log("Build name:", buildName("홍길동"));
console.log("Build name:", buildName("홍길동", "김철수"));

// 3. 기본 매개변수
function greet(name: string, greeting: string = "안녕하세요"): string {
  return `${greeting}, ${name}!`;
}
console.log("Greet:", greet("홍길동"));
console.log("Greet:", greet("홍길동", "반갑습니다"));

// 4. 나머지 매개변수
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
const numbers = [1, 2, 3, 4, 5];
console.log(sum(...numbers)); // 15

// 5. 함수 오버로드
function process1(x: number): number;
function process1(x: string): string;
function process1(x: any): any {
  if (typeof x === "number") {
    return x * 2;
  }
  return `processed: ${x}`;
}
console.log("Process number:", process1(10));
console.log("Process string:", process1("hello"));
// 6. 제네릭 함수
function identity<T>(arg: T): T {
  return arg;
}
console.log("Identity number:", identity<number>(42));
console.log("Identity string:", identity<string>("hello"));

// 7. 제네릭 인터페이스
interface GenericIdentityFn<T> {
  (arg: T): T;
}
const myIdentity: GenericIdentityFn<number> = identity;
console.log("Generic identity:", myIdentity(100));

// 8. 제네릭 클래스
class GenericNumber<T> {
  zeroValue!: T;
  add!: (x: T, y: T) => T;
}
const myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;
console.log("Generic number add:", myGenericNumber.add(5, 3));

// 실행 예시
console.log("=== TypeScript 함수와 제네릭 예제 ===");

function logValue<T extends string | number | boolean>(value: T): void {
  console.log(value);
}

// 사용 예시
logValue("hello"); // string
logValue(42); // number
logValue(true); // boolean

function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// 사용 예시
const result = pair<string, number>("hello", 42);
// result의 타입은 [string, number]

// 사용 예시
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 }; // 객체 병합
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6]; // 배열 확장
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

const original = { x: 1, y: 2 }; // 객체 복사
const copy = { ...original }; // 얕은 복사

const user1 = { name: "John", age: 30 }; // 객체 확장
const updatedUser = { ...user, age: 31 }; // { name: 'John', age: 31 }

function sum1(...numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
const numbers1 = [1, 2, 3, 4, 5];
console.log(sum(...numbers)); // 15 함수 인자 전달
