function fetchData(callback) {
    setTimeout(() => {
      const data = "서버에서 받은 데이터";
      callback(data);  // 작업이 완료된 후 콜백 호출
    }, 1000);  // 1초 후 데이터 반환
}
  
function handleData(data) {
    console.log("콜백으로 받은 데이터:", data);
}
  
fetchData(handleData);
  