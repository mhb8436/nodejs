let arr = [5, 23, '안녕',true, '홍길동', -9];
for(i in arr) {
    if( i > 0 && i < 5){
        console.log(` ${i} is ${arr[i]}`);
    }
    
}

/*
1 is 23
2 is 안녕
3 is true
4 is 홍길동
*/