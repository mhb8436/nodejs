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
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];

// 2. 열거형 (Enum)
enum Color {
  Red,
  Green,
  Blue,
}
let favoriteColor: Color = Color.Blue;

// 3. Any 타입
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

// 4. Void 타입
function warnUser(): void {
  console.log("This is a warning message");
}

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
let n: null = null;

// 7. 타입 단언
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// 8. 유니온 타입
let unionType: string | number = "hello";
unionType = 42;

// 실행 예시
console.log("=== TypeScript 기본 타입 예제 ===");
console.log("Boolean:", isDone);
console.log("Number:", decimal);
console.log("String:", color);
console.log("Array:", list);
console.log("Tuple:", tuple);
console.log("Enum:", favoriteColor);
console.log("Any:", notSure);
warnUser();
