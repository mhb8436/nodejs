let arr = [5, 23, 'hello', true, 'world', -9]

for(i in arr) {
    if(typeof(arr[i]) == 'string'){
        break;
    }
    console.log(arr[i]);
}


