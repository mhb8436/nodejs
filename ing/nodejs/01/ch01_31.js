function fetchData() {
    setTimeout(()=> {
        console.log('서버에서 데이터를 받았습니다.');
    }, 2000);
}

console.log('서버에게 데이터 요청 시작 ')
const data = fetchData();
console.log('서버에서 데이터를 받았습니까?', data);

