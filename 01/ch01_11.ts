/**
 * TypeScript 기본 타입 학습
 *
 * 이 파일에서는 TypeScript의 기본 타입들을 학습합니다:
 * - number: 숫자 타입
 * - string: 문자열 타입
 * - boolean: 불리언 타입
 * - null: null 타입
 * - undefined: undefined 타입
 * - any: 모든 타입
 * - void: 반환값이 없는 함수
 * - never: 절대 발생하지 않는 값
 */

// 1. 기본 타입 선언
let isDone: boolean = false;
console.log("Boolean:", isDone);

let decimal: number = 6;
console.log("Number:", decimal);

let color: string = "blue";
console.log("String:", color);

let list: number[] = [1, 2, 3];
console.log("Array:", list);

let tuple: [string, number] = ["hello", 10];
console.log("Tuple:", tuple);

// 2. 열거형 (Enum)
enum Color {
  Red,
  Green,
  Blue,
}
let favoriteColor: Color = Color.Blue;
console.log("Enum:", favoriteColor);

// 3. Any 타입
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;
console.log("Any:", notSure);

// 4. Void 타입
function warnUser(): void {
  console.log("This is a warning message");
}
warnUser();

// 5. Never 타입
function error(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {
    // 끝나지 않는 루프
  }
}

// 6. Null과 Undefined
let u: undefined = undefined;
console.log("Undefined:", u);

let n: null = null;
console.log("Null:", n);

// 7. 타입 단언
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
console.log("String Length:", strLength);

// 8. 유니온 타입
let unionType: string | number = "hello";
console.log("Union Type (string):", unionType);
unionType = 42;
console.log("Union Type (number):", unionType);

// 실행 예시
console.log("=== TypeScript 기본 타입 예제 ===");
