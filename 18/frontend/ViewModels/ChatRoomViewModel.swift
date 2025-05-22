import Foundation
import Combine

class ChatRoomViewModel: ObservableObject {
    @Published var messages: [Message] = []
    var token: String = ""
    var chatRoomId: Int = 0

    func fetchMessages() {
        APIService.shared.fetchMessages(chatRoomId: chatRoomId) { messages in
            DispatchQueue.main.async {
                self.messages = messages
            }
        }
    }
}
