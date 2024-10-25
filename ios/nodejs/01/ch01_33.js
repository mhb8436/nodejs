function fetchData() {
    return new Promise((resolve, reject)=>{
        const success = true;
        if(success) {
            resolve("서버에서 받은 데이터");
        } else {
            reject("데이터 요청 실패");
        }
    });
}

fetchData().then((data)=> {
    console.log(`프로미스로 부터 받은 데이터는 ${data}`);
}).catch((error)=> {
    console.log(`에러가 발생 : ${error}`);
});