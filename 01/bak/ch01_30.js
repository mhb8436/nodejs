try{
    const err = new Error('This is Error');
    err.name = 'My Error';
    err.message = 'My Error Message'

    throw err;
}catch(e) { 
    console.log(`exception occured => 
        name:${e.name}, message: ${e.message}`);
}finally {
    console.log(`finally called`);
}



