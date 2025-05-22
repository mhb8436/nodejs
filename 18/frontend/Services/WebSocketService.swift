import Foundation
import Starscream

class WebSocketService: ObservableObject, WebSocketDelegate {
    @Published var messages: [Message] = []
    var socket: WebSocket?
    var token: String
    var chatRoomId: Int

    init(token: String, chatRoomId: Int) {
        self.token = token
        self.chatRoomId = chatRoomId
        let url = URL(string: "ws://localhost:3000?access_token=\(token)")!
        var request = URLRequest(url: url)
        socket = WebSocket(request: request)
        socket?.delegate = self
        socket?.connect()
    }

    func sendMessage(content: String) {
        let data: [String: Any] = [
            "event": "sendMessage",
            "data": [
                "chatRoomId": chatRoomId,
                "content": content
            ]
        ]
        if let jsonData = try? JSONSerialization.data(withJSONObject: data) {
            socket?.write(data: jsonData)
        }
    }

    func didReceive(event: WebSocketEvent, client: WebSocket) {
        switch event {
        case .text(let string):
            // JSON 파싱 후 messages에 추가
            break
        default: break
        }
    }
}
