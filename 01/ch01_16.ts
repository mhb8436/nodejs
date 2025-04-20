/**
 * TypeScript 유니온 타입과 인터섹션 타입 학습
 *
 * 이 파일에서는 TypeScript의 유니온 타입과 인터섹션 타입을 학습합니다:
 * - 유니온 타입
 * - 인터섹션 타입
 * - 타입 가드
 * - 타입 별칭
 * - 리터럴 타입
 */

// 1. 유니온 타입
// type StringOrNumber = string | number;

// function printValue(value: StringOrNumber): void {
//   if (typeof value === "string") {
//     console.log("문자열:", value.toUpperCase());
//   } else {
//     console.log("숫자:", value.toFixed(2));
//   }
// }

// // 유니온 타입 실행 예시
// console.log("\n=== 유니온 타입 예시 ===");
// printValue("hello"); // 출력: 문자열: HELLO
// printValue(42); // 출력: 숫자: 42.00

// // 2. 인터섹션 타입
// interface Person {
//   name: string;
//   age: number;
// }

// interface Employee {
//   id: number;
//   department: string;
// }

// type EmployeeWithPerson = Omit<Person, "name"> & Employee;

// // 인터섹션 타입 실행 예시
// console.log("\n=== 인터섹션 타입 예시 ===");
// const employee: EmployeeWithPerson = {
//   age: 30,
//   id: 1,
//   department: "개발팀",
// };
// console.log("Employee:", employee); // 출력: Employee: { age: 30, id: 1, department: '개발팀' }

// // 3. 타입 가드
// interface BirdType {
//   fly(): void;
//   layEggs(): void;
// }

// interface FishType {
//   swim(): void;
//   layEggs(): void;
// }

// function isFish(pet: BirdType | FishType): pet is FishType {
//   return (pet as FishType).swim !== undefined;
// }

// // 타입 가드 실행 예시
// console.log("\n=== 타입 가드 예시 ===");
// const fish: FishType = {
//   swim: () => console.log("수영 중..."),
//   layEggs: () => console.log("알을 낳는 중..."),
// };

// const flyingBird: BirdType = {
//   fly: () => console.log("날아가는 중..."),
//   layEggs: () => console.log("알을 낳는 중..."),
// };

// function move(pet: BirdType | FishType): void {
//   if (isFish(pet)) {
//     pet.swim();
//   } else {
//     pet.fly();
//   }
// }

// move(fish); // 출력: 수영 중...
// move(flyingBird); // 출력: 날아가는 중...

// // 4. 타입 별칭
// type Point = {
//   x: number;
//   y: number;
// };

// type ID = string | number;

// // 타입 별칭 실행 예시
// console.log("\n=== 타입 별칭 예시 ===");
// const myPoint: Point = { x: 10, y: 20 };
// const userId: ID = "user123";
// const numericId: ID = 123;
// console.log("Point:", myPoint); // 출력: Point: { x: 10, y: 20 }
// console.log("User ID:", userId); // 출력: User ID: user123
// console.log("Numeric ID:", numericId); // 출력: Numeric ID: 123

// // 5. 리터럴 타입
// type Direction = "North" | "South" | "East" | "West";

// // 리터럴 타입 실행 예시
// console.log("\n=== 리터럴 타입 예시 ===");
// function moveDirection(direction: Direction): void {
//   console.log(`${direction}쪽으로 이동 중...`);
// }

// moveDirection("North"); // 출력: North쪽으로 이동 중...
// moveDirection("South"); // 출력: South쪽으로 이동 중...

// 6. 유니온 타입과 인터페이스
interface ASquare {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type GeometricShape = ASquare | Rectangle;

// 유니온 타입과 인터페이스 실행 예시
console.log("\n=== 유니온 타입과 인터페이스 예시 ===");
function getArea(shape: GeometricShape): number {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
  }
}

const square: ASquare = { kind: "square", size: 5 };
const rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };

console.log("Square area:", getArea(square)); // 출력: Square area: 25
console.log("Rectangle area:", getArea(rectangle)); // 출력: Rectangle area: 24
