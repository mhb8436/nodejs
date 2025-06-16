// 객체 기본
let personInfo = {
  name: "lee",
  age: 15,
  address: "seoul",
  hobby: ["fishing", "rc", "star"],
};

console.log(personInfo["name"]);
console.log(personInfo["address"]);
console.log(personInfo["hobby"]);
console.log(personInfo.age);

// 객체 순회
for (let key in personInfo) {
  console.log(`${key} : ${personInfo[key]}`);
}

// 객체 메서드
let personInfoWithMethod = {
  name: "lee",
  age: 15,
  address: "seoul",
  hobby: ["fishing", "rc", "star"],
  addAge: function () {
    this.age = this.age + 1;
  },
};

console.log(`before age : ${personInfoWithMethod.age}`);
personInfoWithMethod.addAge();
console.log(`after age : ${personInfoWithMethod.age}`);

// 클래스
class PersonInfo {
  constructor(name, age, address, hobby) {
    this.name = name;
    this.age = age;
    this.address = address;
    this.hobby = hobby;
  }

  addAge(age) {
    this.age = this.age + age;
  }

  getAge() {
    return this.age;
  }
}

let p = new PersonInfo("lee", 12, "seoul", ["rc", "star"]);
console.log(`before age : ${p.getAge()}`);
p.addAge(10);
console.log(`after age : ${p.getAge()}`);

// 상속
class Employee extends PersonInfo {
  constructor(name, age, address, hobby, salary) {
    super(name, age, address, hobby);
    this.salary = salary;
  }
}

let e = new Employee("kim", 20, "incheon", ["soccer", "game"], 1000);
console.log(e);

// 정적 메서드
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtils.add(10, 20));


// 문제 1 클래스명은 CarInfo, 속성은 brand, color, model 
//       메서드는 drive() -> "모델 xx가 달리는 중", stop() -> "모델 xx가 멈췄습니다."
//       객체를 2개 정도 생성 후에 drive, stop 메소드 호출 해보기 


// 문제 2 CarInfo를 상속 받아서 ElectricCarInfo를 만들어보세요 
//       추가 속성은 battery,
//       추가로 charge() -> "모델 xx가 충전 중", stop() -> "모델 xx가 멈췄습니다." 메소드 추가 
//       객체를 2개 정도 생성 후에 drive, stop 메소드 호출 해보기 

