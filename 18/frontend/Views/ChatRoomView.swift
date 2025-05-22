import SwiftUI

struct ChatRoomView: View {
    let chatRoomId: Int
    let token: String
    @ObservedObject var socketService: WebSocketService
    @State private var input = ""

    init(chatRoomId: Int, token: String) {
        self.chatRoomId = chatRoomId
        self.token = token
        self._socketService = ObservedObject(wrappedValue: WebSocketService(token: token, chatRoomId: chatRoomId))
    }

    var body: some View {
        VStack {
            List(socketService.messages) { msg in
                HStack {
                    Text(msg.user.nickname).bold()
                    Text(msg.content)
                }
            }
            HStack {
                TextField("메시지 입력", text: $input)
                Button("보내기") {
                    socketService.sendMessage(content: input)
                    input = ""
                }
            }.padding()
        }
        .navigationTitle("채팅방")
    }
}
