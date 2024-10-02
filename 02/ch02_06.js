let arr = [1,2,3]

// push 
arr.push(4)
console.log('arr', arr)

// map
const arr2 = arr.map(x=>{
    return x+1;
});
console.log('arr2', arr2);

// filter
const arr3 = arr.filter(x=> {
    return x%2 == 0; // boolean 
});
console.log('arr3', arr3)

// forEach
arr.forEach((v, i)=> {
    console.log('arr4', v+2)
});

// sort
const arr5 = arr.sort((a,b) => {
    console.log(a, b, b-a);
    return b - a;
});
console.log('arr5', arr5);

