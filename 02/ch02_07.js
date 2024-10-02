let data = [1,2,3,4,5,6,7,8,9,10]

for(var i=11;i<21;i++) {
    data.push(i)
}
console.log(data);

const data2 = data.map(x => x*2);
console.log(data2)

const data3 = data.filter(x => x%2 ==0);
console.log(data3)

data.forEach(x=> {
    if(x >=5 && x <= 15){
        console.log(x);
    }
});

