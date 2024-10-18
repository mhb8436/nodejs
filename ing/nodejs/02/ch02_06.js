let arr = [1,2,3];

arr.push(4);
arr.push(5);
console.log(arr);

const arr2 = arr.map((x)=> {
    return `Hello ${x}`;
});
console.log(arr2);

const arr3 = arr.filter(x => {
    return x%2 == 0; // boolean  
});
console.log(arr3);

const arr4 = arr.filter(x=> {
    return x%2 == 1;
});
console.log(arr4);

arr.forEach((v,i)=> {
    console.log(`arr5 => ${v} ${i}`)
});