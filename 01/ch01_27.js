// 객체와 메서드
let personInfo = {
    name: 'lee',
    age: 15,
    address: 'seoul',
    hobby: ['fishing','rc','star'],
    addAge: function() {
        this.age = this.age + 1;
    }
}

console.log(`before age : ${personInfo.age}`);
personInfo.addAge();
console.log(`after age : ${personInfo.age}`);



