/**
 * TypeScript 데코레이터 학습
 *
 * 이 파일에서는 TypeScript의 데코레이터를 학습합니다:
 * - 클래스 데코레이터
 * - 메서드 데코레이터
 * - 프로퍼티 데코레이터
 */

import "reflect-metadata";

// 1. 클래스 데코레이터
function classDecorator<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    newProperty = "새로운 프로퍼티";
    hello = "안녕하세요";
  };
}

// 클래스 데코레이터 사용 예시
@classDecorator
class ExampleClass {
  constructor(public name: string) {}
}

// 2. 메서드 데코레이터
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`메서드 ${propertyKey} 호출됨`);
    const result = originalMethod.apply(this, args);
    console.log(`메서드 ${propertyKey} 완료됨`);
    return result;
  };

  return descriptor;
}

// 메서드 데코레이터 사용 예시
class ExampleMethod {
  @log
  greet(name: string): string {
    return `안녕하세요, ${name}!`;
  }
}

// 3. 프로퍼티 데코레이터
function format() {
  return function (target: any, propertyKey: string) {
    let value = target[propertyKey];

    const getter = function () {
      return value;
    };

    const setter = function (newVal: string) {
      value = newVal.toUpperCase();
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

// 프로퍼티 데코레이터 사용 예시
class ExampleProperty {
  @format()
  name: string = "홍길동";
}

// 실행 예시
console.log("=== TypeScript 데코레이터 예제 ===");

// 클래스 데코레이터 테스트
const exampleClass = new ExampleClass("홍길동");
console.log("클래스 데코레이터 테스트:");
console.log("Name:", exampleClass.name);
console.log("New property:", (exampleClass as any).newProperty);
console.log("Hello:", (exampleClass as any).hello);

// 메서드 데코레이터 테스트
const exampleMethod = new ExampleMethod();
console.log("\n메서드 데코레이터 테스트:");
console.log(exampleMethod.greet("철수"));

// 프로퍼티 데코레이터 테스트
const exampleProperty = new ExampleProperty();
console.log("\n프로퍼티 데코레이터 테스트:");
console.log("Original name:", exampleProperty.name);
exampleProperty.name = "kim";
console.log("After setting name:", exampleProperty.name);
