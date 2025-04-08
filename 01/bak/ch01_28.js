// 클래스 
class PersonInfo {
    constructor(name, age, address, hobby) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.hobby = hobby
    }

    addAge(age) {
        this.age = this.age + age;        
    }

    getAge() {
        return this.age;
    }
} 

let p = new PersonInfo('lee', 12, 'seoul', ['rc','star']);
console.log(`before age : ${p.getAge()}`);
p.addAge(10);
console.log(`after age : ${p.getAge()}`);


