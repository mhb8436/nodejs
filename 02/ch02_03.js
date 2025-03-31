const EventEmitter = require("events");

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = new Set();
  }

  join(user) {
    this.users.add(user);
    this.emit("userJoined", user);
  }

  leave(user) {
    this.users.delete(user);
    this.emit("userLeft", user);
  }

  message(user, message) {
    this.emit("message", { user, message });
  }
}

// 채팅방 인스턴스 생성
const chatRoom = new ChatRoom();

// 이벤트 리스너 등록
chatRoom.on("userJoined", (user) => {
  console.log(`${user}님이 입장했습니다.`);
});

chatRoom.on("userLeft", (user) => {
  console.log(`${user}님이 퇴장했습니다.`);
});

chatRoom.on("message", ({ user, message }) => {
  console.log(`${user}: ${message}`);
});

// 이벤트 발생
chatRoom.join("Alice");
chatRoom.message("Alice", "안녕하세요!");
chatRoom.join("Bob");
chatRoom.message("Bob", "반갑습니다!");
chatRoom.leave("Alice");
