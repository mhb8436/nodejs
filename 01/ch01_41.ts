/**
 * TypeScript 유틸리티 타입 학습
 *
 * 이 파일에서는 TypeScript의 유틸리티 타입을 학습합니다:
 * - Partial<T>
 * - Required<T>
 * - Readonly<T>
 * - Record<K,T>
 * - Pick<T,K>
 * - Omit<T,K>
 * - Exclude<T,U>
 * - Extract<T,U>
 * - NonNullable<T>
 */

// 1. Partial<T>
interface User {
  name: string;
  age: number;
  email?: string;
}

type PartialUser = Partial<User>;

// 2. Required<T>
type RequiredUser = Required<User>;

// 3. Readonly<T>
type ReadonlyUser = Readonly<User>;

// 4. Record<K,T>
type CatInfo = {
  age: number;
  breed: string;
};

type CatName = "molly" | "boris" | "maggie";

type Cats = Record<CatName, CatInfo>;

// 5. Pick<T,K>
type UserNameAndAge = Pick<User, "name" | "age">;

// 6. Omit<T,K>
type UserWithoutAge = Omit<User, "age">;

// 7. Exclude<T,U>
type T0 = Exclude<"a" | "b" | "c", "a">;
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;

// 8. Extract<T,U>
type T2 = Extract<"a" | "b" | "c", "a" | "f">;
type T3 = Extract<string | number | (() => void), Function>;

// 9. NonNullable<T>
type T4 = NonNullable<string | number | undefined>;
type T5 = NonNullable<string[] | null | undefined>;

// 실행 예시
console.log("=== TypeScript 유틸리티 타입 예제 ===");

// Partial 사용
const partialUser: PartialUser = {
  name: "홍길동",
};
console.log("Partial user:", partialUser);

// Required 사용
const requiredUser: RequiredUser = {
  name: "홍길동",
  age: 25,
  email: "hong@example.com",
};
console.log("Required user:", requiredUser);

// Readonly 사용
const readonlyUser: ReadonlyUser = {
  name: "홍길동",
  age: 25,
};
console.log("Readonly user:", readonlyUser);

// Record 사용
const cats: Cats = {
  molly: { age: 3, breed: "페르시안" },
  boris: { age: 5, breed: "러시안 블루" },
  maggie: { age: 2, breed: "샴" },
};
console.log("Cats:", cats);

// Pick 사용
const userNameAndAge: UserNameAndAge = {
  name: "홍길동",
  age: 25,
};
console.log("User name and age:", userNameAndAge);

// Omit 사용
const userWithoutAge: UserWithoutAge = {
  name: "홍길동",
  email: "hong@example.com",
};
console.log("User without age:", userWithoutAge);

// Exclude 사용
console.log("Exclude T0:", "b" + " | " + "c");
console.log("Exclude T1:", "c");

// Extract 사용
console.log("Extract T2:", "a");
console.log("Extract T3:", "() => void");

// NonNullable 사용
console.log("NonNullable T4:", "string | number");
console.log("NonNullable T5:", "string[]");
