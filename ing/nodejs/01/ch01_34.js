function fetchData() {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            const success = true;
            if(success) {
                resolve("서버에서 받은 데이터");
            }else{
                reject("데이터 요청 실패");
            }
        }, 1000);
    });
}

async function getData(){
    try{
        const data = await fetchData();
        console.log(`async/await로 받은 데이터: ${data}`);
    }catch(e) {
        console.error(`에러: ${e}`);
    }
}

getData();