console.log(`------ normal jo b------`)
function getDB(){
    let data
    data = 100;
    return data;
}

function list(){
    let value = getDB();
    value += 2;
    console.log(`list value : ${value}`);
}

list();


