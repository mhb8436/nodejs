console.log(`---- promise ----`)
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


