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

// 실행 예시
const userService = new UserService();
userService.addUser({ name: "홍길동", age: 25 });
console.log("Users:", userService.getUsers());

// 2. 네임스페이스
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class LettersOnlyValidator implements StringValidator {
    isValid(s: string): boolean {
      return /^[A-Za-z]+$/.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isValid(s: string): boolean {
      return /^\d{5}(-\d{4})?$/.test(s);
    }
  }
}

// 실행 예시
const lettersValidator = new Validation.LettersOnlyValidator();
const zipCodeValidator = new Validation.ZipCodeValidator();
console.log("Letters validator:", lettersValidator.isValid("Hello"));
console.log("Letters validator:", lettersValidator.isValid("Hello123"));
console.log("Zip code validator:", zipCodeValidator.isValid("12345"));
console.log("Zip code validator:", zipCodeValidator.isValid("12345-6789"));

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

// 4. 모듈 병합
interface Animal {
  name: string;
}

interface Animal {
  age: number;
}

// 실행 예시
const animal: Animal = {
  name: "멍멍이",
  age: 3,
};
console.log("Animal:", animal);

// 5. 모듈 해석
// npm install --save-dev @types/node

// 실행 예시
console.log("모듈 해석 예시: Node.js 타입 정의가 설치되어 있어야 합니다.");
