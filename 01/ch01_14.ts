/**
 * TypeScript 클래스와 상속 학습
 *
 * 이 파일에서는 TypeScript의 클래스와 상속을 학습합니다:
 * - 클래스 정의
 * - 생성자
 * - 상속
 * - 접근 제어자
 * - 추상 클래스
 * - 인터페이스 구현
 * - 정적 프로퍼티
 * - getter/setter
 */

// 1. 기본 클래스
class Animal {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public move(distance: number = 0): void {
    console.log(`${this.name} moved ${distance}m.`);
  }

  public getInfo(): string {
    return `이름: ${this.name}, 나이: ${this.age}`;
  }
}
const animal = new Animal("동물", 5);
console.log("Animal info:", animal.getInfo());
animal.move(10);

// 2. 상속
class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
  }

  public bark(): void {
    console.log("멍멍!");
  }

  public getInfo(): string {
    return `${super.getInfo()}, 품종: ${this.breed}`;
  }
}
const dog = new Dog("멍멍이", 3, "골든 리트리버");
console.log("Dog info:", dog.getInfo());
dog.bark();
dog.move(20);

// 3. 추상 클래스
abstract class AShape {
  protected color: string;

  constructor(color: string) {
    this.color = color;
  }

  abstract getArea(): number;
  abstract getPerimeter(): number;
}

// 4. 추상 클래스 구현
class Circle extends AShape {
  private radius: number;

  constructor(color: string, radius: number) {
    super(color);
    this.radius = radius;
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}
const circle = new Circle("빨간색", 5);
console.log("Circle area:", circle.getArea());
console.log("Circle perimeter:", circle.getPerimeter());

// 5. 인터페이스 구현
interface Flyable {
  fly(): void;
}

class Bird extends Animal implements Flyable {
  private wingspan: number;

  constructor(name: string, age: number, wingspan: number) {
    super(name, age);
    this.wingspan = wingspan;
  }

  fly(): void {
    console.log(`${this.name} is flying with wingspan ${this.wingspan}m.`);
  }
}
const bird = new Bird("참새", 2, 0.5);
console.log("Bird info:", bird.getInfo());
bird.fly();

// 6. 정적 프로퍼티와 메서드
class MathUtil {
  static PI: number = 3.14159;

  static calculateCircleArea(radius: number): number {
    return this.PI * radius * radius;
  }
}
console.log("PI:", MathUtil.PI);
console.log("Circle area:", MathUtil.calculateCircleArea(5));

// 7. getter/setter
class Person {
  private _name: string = "";

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (value.length < 3) {
      throw new Error("이름은 3자 이상이어야 합니다.");
    }
    this._name = value;
  }
}
const person = new Person();
person.name = "홍길동";
console.log("Person name:", person.name);

// 실행 예시
console.log("=== TypeScript 클래스와 상속 예제 ===");
