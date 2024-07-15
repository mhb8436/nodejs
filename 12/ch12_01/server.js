// server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
  console.log('클라이언트가 연결되었습니다.');

  // 클라이언트로부터 메시지를 받았을 때
  ws.on('message', message => {
    console.log(`받은 메시지: ${message}`);
    
    // 클라이언트에게 메시지 전송
    ws.send(`서버로부터 응답: ${message}`);
  });

  // 클라이언트가 연결을 닫았을 때
  ws.on('close', () => {
    console.log('클라이언트 연결이 종료되었습니다.');
  });
});

console.log('웹 소켓 서버가 ws://localhost:8080 에서 실행 중입니다.');


