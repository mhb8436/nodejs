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
 */

// 1. Partial<T>
interface User {
  name: string;
  age: number;
  email?: string;
}

type PartialUser = Partial<User>;
const partialUser: PartialUser = {
  name: "홍길동",
};
console.log("Partial user:", partialUser);

// 2. Required<T>
type RequiredUser = Required<User>;
const requiredUser: RequiredUser = {
  name: "홍길동",
  age: 25,
  email: "hong@example.com",
};
console.log("Required user:", requiredUser);

// 3. Readonly<T>
type ReadonlyUser = Readonly<User>;
const readonlyUser: ReadonlyUser = {
  name: "홍길동",
  age: 25,
};
console.log("Readonly user:", readonlyUser);

// 4. Record<K,T>
type CatInfo = {
  age: number;
  breed: string;
};

type CatName = "molly" | "boris" | "maggie";

type Cats = Record<CatName, CatInfo>;
const cats: Cats = {
  molly: { age: 3, breed: "페르시안" },
  boris: { age: 5, breed: "러시안 블루" },
  maggie: { age: 2, breed: "샴" },
};
console.log("Cats:", cats);

// 5. Pick<T,K>
type UserNameAndAge = Pick<User, "name" | "age">;
const userNameAndAge: UserNameAndAge = {
  name: "홍길동",
  age: 25,
};
console.log("User name and age:", userNameAndAge);

// 6. Omit<T,K>
type UserWithoutAge = Omit<User, "age">;
const userWithoutAge: UserWithoutAge = {
  name: "홍길동",
  email: "hong@example.com",
};
console.log("User without age:", userWithoutAge);
