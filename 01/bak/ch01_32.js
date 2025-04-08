function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;  // 작업 성공 여부
      if (success) {
        resolve("서버에서 받은 데이터");
      } else {
        reject("데이터 요청 실패");
      }
    }, 1000);  // 1초 후 결과 반환
  });
}

fetchData()
  .then(data => {
    console.log("프라미스로 받은 데이터:", data);
  })
  .catch(error => {
    console.error("에러:", error);
  });
