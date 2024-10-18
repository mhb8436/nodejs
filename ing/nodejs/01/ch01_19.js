let arr = [5,23,'안녕',true, '홍길동', -9];

for (i in arr) {    
    console.log(`${i} is ${arr[i]}`);
    if(typeof(arr[i]) == 'string') {
        break;
    }
}
