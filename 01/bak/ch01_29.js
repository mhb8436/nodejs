try{
    const arr = new Array(-1);
}catch(e) { 
    console.log(`exception occured : ${e}`);
}finally {
    console.log(`finally called`);
}



