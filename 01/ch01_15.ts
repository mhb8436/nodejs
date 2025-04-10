/**
 * TypeScript 모듈과 네임스페이스 학습
 *
 * 이 파일에서는 TypeScript의 모듈과 네임스페이스를 학습합니다:
 * - 모듈 내보내기/가져오기
 * - 네임스페이스
 * - 모듈 해석
 * - 모듈 확장
 * - 모듈 병합
 */

// 1. 모듈 내보내기/가져오기
export interface User {
  name: string;
  age: number;
}

export class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  getUsers(): User[] {
    return this.users;
  }
}

import { UserService as UserService2, User as User2 } from "./ch01_15";

// 실행 예시
const userService = new UserService2();
// User2는 인터페이스이므로 직접 인스턴스화할 수 없음
// 대신 User2 인터페이스를 만족하는 객체 리터럴 사용
const user: User2 = { name: "홍길동", age: 25 };
userService.addUser(user);
console.log("Users:", userService.getUsers());

// 2. 네임스페이스
namespace Calculator {
  export interface Operation {
    calculate(a: number, b: number): number;
  }

  export class Add implements Operation {
    calculate(a: number, b: number): number {
      return a + b;
    }
  }

  export class Subtract implements Operation {
    calculate(a: number, b: number): number {
      return a - b;
    }
  }

  export class Multiply implements Operation {
    calculate(a: number, b: number): number {
      return a * b;
    }
  }
}

// 실행 예시
const add = new Calculator.Add();
const subtract = new Calculator.Subtract();
const multiply = new Calculator.Multiply();

console.log("10 + 5 =", add.calculate(10, 5));
console.log("10 - 5 =", subtract.calculate(10, 5));
console.log("10 * 5 =", multiply.calculate(10, 5));

// 3. 모듈 확장
declare module "./ch01_15" {
  interface User {
    email?: string;
  }
}

// 실행 예시
const extendedUser: User = {
  name: "김철수",
  age: 30,
  email: "kim@example.com",
};
console.log("Extended User:", extendedUser);

// 4. 모듈 해석
// npm install --save-dev @types/node

// 실행 예시
console.log("모듈 해석 예시: Node.js 타입 정의가 설치되어 있어야 합니다.");
