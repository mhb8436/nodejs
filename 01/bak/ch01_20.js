let arr = [5, 23, 'hello', true, 'world', -9]

for(i in arr) {
    if(typeof(arr[i]) == 'string'){
        console.log(arr[i]);
        continue;
    }
    console.log(arr[i]);
}



