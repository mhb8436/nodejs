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
