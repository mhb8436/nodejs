let personInfo = {
    'name': '홍길동',
    'age': 25,
    'address': '서울시 금천구 독산동',
    'hobby': ['등산', '독서','코딩'],
    addAge: function(){
        this.age = this.age + 1;
    },
    changeAddress: function(address){
        this.address = address;
    },
    getAddress: function(){
        return this.address;
    },
    getAge: function() {
        
    } /* 나이를 반환 합니다. */
}
console.log(`before age : ${personInfo.age}`);
personInfo.addAge();
console.log(`after age : ${personInfo.getAge()}`);

console.log(`before address : ${personInfo.address}`);
personInfo.changeAddress("서울시 종로구 익선동");
console.log(`after address : ${personInfo.getAddress()}`);
