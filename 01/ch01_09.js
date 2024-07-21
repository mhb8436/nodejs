// 기본 조건문 
let date = new Date();

if (date.getHours() < 12 ) {
    console.log(`오전입니다 : ${date.getHours()}`);
}else if(date.getHours() >= 12 ){
    console.log(`오후입니다 : ${date.getHours()}`);
}


