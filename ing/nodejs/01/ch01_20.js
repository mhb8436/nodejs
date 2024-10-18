let arr = [5,23,'안녕',true, '홍길동', -9];

for (i in arr) {    
    if(typeof(arr[i]) == 'string') {
        continue;
    }
    console.log(` ${i} => ${arr[i]}`);
}
