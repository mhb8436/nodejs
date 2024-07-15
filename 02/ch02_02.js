for(var i=0;i<10;i++) {
    console.log('file' + (i+1));
}

console.log('------------');

const arr = [1,2,3,4,5,6,7,8,9,10];
arr.forEach(i=> {
    console.log(`file${i}`)
});

console.log('------------');

Array.from({length: 10}, (_,i) => {
    console.log('file' + (i+1))
});

console.log('------------');

const arr2 = [...Array(10).keys()];
arr2.forEach(i=> {
    console.log(`file${i+1}`)
});

