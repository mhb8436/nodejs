try{
    const err = new Error('커스텀 예외');
    err.name = '나의 첫번째 예외';
    err.message = '예외 메시지 입니다.'
    throw err;
}catch(e) {
    console.log(`예외처리 예외이름: ${e.name}, 예외메시지: ${e.message}`);
}
