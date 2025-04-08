// for 문과 객체 
let personInfo = {
    name: 'lee',
    age: 15,
    address: 'seoul',
    hobby: ['fishing','rc','star']
}

for(let key in personInfo){
    console.log(`${key} : ${personInfo[key]}`);
}


