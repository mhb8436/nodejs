// console.log(`------------------ normal job -----------------`)
// function getDB(){
//     let data
//     data = 100;
//     return data;
// }

// function list(){
//     let value = getDB();
//     value += 2;
//     console.log(`list value : ${value}`);
// }

// list();

// console.log(`------------------ long time job -----------------`)
// function getDB(){
//     let data
//     setTimeout(()=>{
//         data = 100;
//     }, 1000);    
//     return data;
// }

// function list(){
//     let value = getDB();
//     value += 2;
//     console.log(`list value : ${value}`);
// }

// list();


// console.log(`------------------ callbak -----------------`)
// function getDB(callback){
//     let data
//     setTimeout(()=>{
//         data = 100;
//         callback(data);
//     }, 1000);    
//     return data;
// }

// function list(){
//     getDB((value)=> {
//         value += 2;
//         console.log(`list value : ${value}`);
//     });        
// }

// list();


// console.log(`------------------ promise -----------------`)
function getDB(){
    let data;
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            data = 100;
            resolve(data);
        }, 1000);
    });
}

function list(){
    getDB().then((value)=> {
        let data = value + 2;
        console.log(`list value : ${data}`);
    })
    .catch((error)=> {
        console.error(error);
    });
}

list();

console.log(`------------------ async/await -----------------`)
function getDB(){
    let data;
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            data = 100;
            resolve(data);
        }, 1000);
    });
}

async function list(){
    let data = await getDB();
    data += 2;
    console.log(`list value : ${data}`);
}

list();