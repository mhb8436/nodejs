console.log(`---- long time job-----`)
function getDB(){
    let data
    setTimeout(()=>{
        data = 100;
    }, 1000);    
    return data;
}

function list(){
    let value = getDB();
    value += 2;
    console.log(`list value : ${value}`);
}

list();


