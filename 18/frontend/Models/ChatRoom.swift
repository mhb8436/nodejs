import Foundation

struct ChatRoom: Codable, Identifiable, Hashable {
    let id: Int
    let name: String
    
    func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
    
    static func == (lhs: ChatRoom, rhs: ChatRoom) -> Bool {
        lhs.id == rhs.id
    }
}
