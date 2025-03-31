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

// 3. 모듈 확장
declare module "./ch01_38" {
  interface User {
    email?: string;
  }
}

// 4. 모듈 병합
interface Animal {
  name: string;
}

interface Animal {
  age: number;
}

// 5. 모듈 해석
// npm install --save-dev @types/node
import * as path from "path";

// 실행 예시
console.log("=== TypeScript 모듈과 네임스페이스 예제 ===");

// Validation 네임스페이스 사용
const lettersValidator = new Validation.LettersOnlyValidator();
const zipCodeValidator = new Validation.ZipCodeValidator();

console.log("Letters validator:", lettersValidator.isValid("Hello"));
console.log("Letters validator:", lettersValidator.isValid("Hello123"));
console.log("Zip code validator:", zipCodeValidator.isValid("12345"));
console.log("Zip code validator:", zipCodeValidator.isValid("12345-6789"));

// UserService 사용
const userService = new UserService();
userService.addUser({ name: "홍길동", age: 25 });
console.log("Users:", userService.getUsers());

// 모듈 병합 예시
const animal: Animal = {
  name: "멍멍이",
  age: 3,
};
console.log("Animal:", animal);

// 모듈 해석 예시
console.log("Path separator:", path.sep);
