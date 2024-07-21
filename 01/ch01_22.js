// callback
function tentimes(callback) {
    for(let i=0;i<10;i++){
        callback();
    }
}

tentimes(function() {
    console.log('call function');
});

