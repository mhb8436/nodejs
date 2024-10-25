let personInfo = {
    'name': '홍길동',
    'age': 25,
    'address': '서울시 금천구 독산동',
    'hobby': ['등산', '독서','코딩']
}
// console.log(personInfo['name']);
// console.log(personInfo.age);
// console.log(personInfo.hobby);
for(let key in personInfo) {
    console.log(`${key} : ${personInfo[key]}`);
}
// console.log(Object.keys(personInfo));
console.log('---------')
for(let key of Object.keys(personInfo)) {
    console.log(`${key} : ${personInfo[key]}`);
}

