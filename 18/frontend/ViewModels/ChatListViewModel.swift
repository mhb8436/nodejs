import Foundation
import Combine

class ChatListViewModel: ObservableObject {
    @Published var rooms: [ChatRoom] = []
    var token: String = ""

    func fetchRooms() {
        APIService.shared.fetchChatRooms { rooms in
            DispatchQueue.main.async {
                self.rooms = rooms
            }
        }
    }
}
