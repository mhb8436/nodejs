/**
 * TypeScript 데코레이터 학습
 *
 * 이 파일에서는 TypeScript의 데코레이터를 학습합니다:
 * - 클래스 데코레이터
 * - 메서드 데코레이터
 * - 접근자 데코레이터
 * - 프로퍼티 데코레이터
 * - 파라미터 데코레이터
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

// 3. 접근자 데코레이터
function configurable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
  };
}

// 4. 프로퍼티 데코레이터
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

// 5. 파라미터 데코레이터
function required(
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  const requiredParameters: number[] =
    Reflect.getOwnMetadata("required", target, propertyKey) || [];
  requiredParameters.push(parameterIndex);
  Reflect.defineMetadata("required", requiredParameters, target, propertyKey);
}

// 데코레이터 사용 예시
@classDecorator
class Example {
  @format()
  name: string = "홍길동";

  constructor(name: string) {
    this.name = name;
  }

  @log
  greet(@required message: string): string {
    return `안녕하세요, ${this.name}! ${message}`;
  }

  @configurable(false)
  get age(): number {
    return 25;
  }
}

// 실행 예시
console.log("=== TypeScript 데코레이터 예제 ===");

const example = new Example("홍길동");
console.log("Name:", example.name);
console.log("Age:", example.age);
console.log("Greet:", example.greet("반갑습니다"));
console.log("New property:", (example as any).newProperty);
console.log("Hello:", (example as any).hello);
