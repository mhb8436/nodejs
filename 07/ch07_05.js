console.log(`---- async/await -----`)
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




