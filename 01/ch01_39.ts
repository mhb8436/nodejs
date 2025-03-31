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
type StringOrNumber = string | number;

function printValue(value: StringOrNumber): void {
  if (typeof value === "string") {
    console.log("문자열:", value.toUpperCase());
  } else {
    console.log("숫자:", value.toFixed(2));
  }
}

// 2. 인터섹션 타입
interface Person {
  name: string;
  age: number;
}

interface Employee {
  id: number;
  department: string;
}

type EmployeeWithPerson = Omit<Person, "name"> & Employee;

// 3. 타입 가드
interface ABird {
  fly(): void;
  layEggs(): void;
}

interface AFish {
  swim(): void;
  layEggs(): void;
}

function isFish(pet: ABird | AFish): pet is AFish {
  return (pet as AFish).swim !== undefined;
}

// 4. 타입 별칭
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

// 5. 리터럴 타입
type Direction = "North" | "South" | "East" | "West";

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

// 실행 예시
console.log("=== TypeScript 유니온 타입과 인터섹션 타입 예제 ===");

// 유니온 타입 사용
printValue("hello");
printValue(42);

// 인터섹션 타입 사용
const employee: EmployeeWithPerson = {
  age: 30,
  id: 1,
  department: "개발팀",
};
console.log("Employee:", employee);

// 타입 가드 사용
const fish: AFish = {
  swim: () => console.log("수영 중..."),
  layEggs: () => console.log("알을 낳는 중..."),
};

const flyingBird: ABird = {
  fly: () => console.log("날아가는 중..."),
  layEggs: () => console.log("알을 낳는 중..."),
};

function move(pet: ABird | AFish): void {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

move(fish);
move(flyingBird);

// 리터럴 타입 사용
function moveDirection(direction: Direction): void {
  console.log(`${direction}쪽으로 이동 중...`);
}

moveDirection("North");
moveDirection("South");

// 유니온 타입과 인터페이스 사용
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

console.log("Square area:", getArea(square));
console.log("Rectangle area:", getArea(rectangle));
