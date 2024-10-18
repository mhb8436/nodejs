class PersonInfo {
    constructor(name, age, address,hobby) {
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

let p = new PersonInfo('홍길동', 35, '서울시 금천구 독산동', ['등산','독서']);
console.log(`before age : ${p.getAge()}`);
p.addAge(10);
console.log(`after age : ${p.getAge()}`);