console.log(`----- callbak -----`)
function getDB(callback){
    let data
    setTimeout(()=>{
        data = 100;
        callback(data);
    }, 1000);    
    return data;
}

function list(){
    getDB((value)=> {
        value += 2;
        console.log(`list value : ${value}`);
    });        
}

list();




