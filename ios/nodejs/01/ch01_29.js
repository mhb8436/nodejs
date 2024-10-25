try{
    const arr = new Array(-1);
}catch(e) {
    console.log(`예외발생: ${e}`);
}finally {
    console.log('예외 처리가 모두 끝남');
}
