function tentimes(callback) {
    for(let i=0;i<10;i++) {
        callback(i);
    }
}

tentimes(function(i) {
    console.log(`call function(${i})`);
});