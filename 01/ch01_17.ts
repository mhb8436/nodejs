/**
 * TypeScript 타입 가드와 타입 단언 학습
 *
 * 이 파일에서는 TypeScript의 타입 가드와 타입 단언을 학습합니다:
 * - 타입 가드
 * - 타입 단언
 * - 타입 서술자
 * - 타입 추론
 * - 타입 호환성
 */

// 1. 타입 가드
interface Car {
  type: "car";
  brand: string;
  model: string;
}

interface Bike {
  type: "bike";
  brand: string;
  isElectric: boolean;
}

type Vehicle = Car | Bike;

function isCar(vehicle: Vehicle): vehicle is Car {
  return vehicle.type === "car";
}

// 2. 타입 단언
let value: any = "this is a string";
let stringLength: number = (value as string).length;

// 3. 타입 서술자
interface User {
  name: string;
  age: number;
}

function isUser(value: any): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.name === "string" &&
    typeof value.age === "number"
  );
}

// 4. 타입 추론
let x = 3; // number 타입으로 추론
let arr = [1, 2, 3]; // number[] 타입으로 추론

// 5. 타입 호환성
interface BaseAnimal {
  name: string;
}

interface BaseDog extends BaseAnimal {
  breed: string;
}

// 실행 예시
console.log("=== TypeScript 타입 가드와 타입 단언 예제 ===");

// 타입 가드 사용
const car: Car = {
  type: "car",
  brand: "현대",
  model: "아반떼",
};

const bike: Bike = {
  type: "bike",
  brand: "삼천리",
  isElectric: true,
};

function printVehicleInfo(vehicle: Vehicle): void {
  if (isCar(vehicle)) {
    console.log(`자동차: ${vehicle.brand} ${vehicle.model}`);
  } else {
    console.log(
      `자전거: ${vehicle.brand} ${vehicle.isElectric ? "전기" : "일반"}`
    );
  }
}

printVehicleInfo(car);
printVehicleInfo(bike);

// 타입 단언 사용
console.log("String length:", length);

// 타입 서술자 사용
const userData = {
  name: "홍길동",
  age: 25,
};

if (isUser(userData)) {
  console.log("User:", userData.name, userData.age);
}

// 타입 추론 예시
console.log("Inferred type x:", typeof x);
console.log("Inferred type arr:", typeof arr);

// 타입 호환성 예시
const baseAnimal: BaseAnimal = {
  name: "동물",
};

const baseDog: BaseDog = {
  name: "멍멍이",
  breed: "골든 리트리버",
};

// BaseDog는 BaseAnimal의 하위 타입이므로 할당 가능
const baseAnimal2: BaseAnimal = baseDog;
console.log("Animal name:", baseAnimal2.name);
