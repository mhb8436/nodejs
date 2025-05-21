import Foundation
import SocketIO

protocol SocketServiceDelegate: AnyObject {
    func didReceiveMessage(_ message: ChatMessage)
    func didConnect()
    func didDisconnect()
    func didReceiveError(_ error: Error)
    func didReceiveTypingStatus(userId: String, roomId: String, isTyping: Bool)
    func didReceiveReadStatus(messageId: String, userId: String)
    func didReceiveUserStatus(userId: String, isOnline: Bool, lastSeen: Date?)
}

class SocketService {
    static let shared = SocketService()
    private var manager: SocketManager?
    private var socket: SocketIOClient?
    private let baseURL = "http://localhost:3000"
    
    weak var delegate: SocketServiceDelegate?
    private var typingTimer: Timer?
    private var currentRoomId: String?
    
    private init() {}
    
    func connect() {
        guard let token = NetworkService.shared.authToken else {
            delegate?.didReceiveError(NSError(domain: "SocketService", code: -1, userInfo: [NSLocalizedDescriptionKey: "No auth token available"]))
            return
        }
        
        let config: SocketIOClientConfiguration = [
            .log(true),
            .extraHeaders(["Authorization": "Bearer \(token)"])
        ]
        
        manager = SocketManager(socketURL: URL(string: baseURL)!, config: config)
        socket = manager?.defaultSocket
        
        setupSocketHandlers()
        socket?.connect()
    }
    
    func disconnect() {
        socket?.disconnect()
        manager = nil
        socket = nil
    }
    
    private func setupSocketHandlers() {
        socket?.on(clientEvent: .connect) { [weak self] _, _ in
            self?.delegate?.didConnect()
        }
        
        socket?.on(clientEvent: .disconnect) { [weak self] _, _ in
            self?.delegate?.didDisconnect()
        }
        
        socket?.on(clientEvent: .error) { [weak self] data, _ in
            if let error = data.first as? Error {
                self?.delegate?.didReceiveError(error)
            }
        }
        
        socket?.on("message") { [weak self] data, _ in
            guard let messageData = data.first as? [String: Any],
                  let message = try? ChatMessage(from: messageData) else {
                return
            }
            self?.delegate?.didReceiveMessage(message)
        }
        
        socket?.on("typing") { [weak self] data, _ in
            guard let typingData = data.first as? [String: Any],
                  let userId = typingData["userId"] as? String,
                  let roomId = typingData["roomId"] as? String,
                  let isTyping = typingData["isTyping"] as? Bool else {
                return
            }
            self?.delegate?.didReceiveTypingStatus(userId: userId, roomId: roomId, isTyping: isTyping)
        }
        
        socket?.on("read") { [weak self] data, _ in
            guard let readData = data.first as? [String: Any],
                  let messageId = readData["messageId"] as? String,
                  let userId = readData["userId"] as? String else {
                return
            }
            self?.delegate?.didReceiveReadStatus(messageId: messageId, userId: userId)
        }
        
        socket?.on("userStatus") { [weak self] data, _ in
            guard let statusData = data.first as? [String: Any],
                  let userId = statusData["userId"] as? String,
                  let isOnline = statusData["isOnline"] as? Bool else {
                return
            }
            
            let lastSeen: Date?
            if let lastSeenString = statusData["lastSeen"] as? String {
                lastSeen = ISO8601DateFormatter().date(from: lastSeenString)
            } else {
                lastSeen = nil
            }
            
            self?.delegate?.didReceiveUserStatus(userId: userId, isOnline: isOnline, lastSeen: lastSeen)
        }
    }
    
    func joinRoom(roomId: String) {
        currentRoomId = roomId
        socket?.emit("join", roomId)
    }
    
    func leaveRoom(roomId: String) {
        if currentRoomId == roomId {
            currentRoomId = nil
        }
        socket?.emit("leave", roomId)
    }
    
    func sendMessage(roomId: String, content: String, type: MessageType, fileName: String? = nil) {
        var messageData: [String: Any] = [
            "roomId": roomId,
            "content": content,
            "type": type.rawValue
        ]
        
        if let fileName = fileName {
            messageData["fileName"] = fileName
        }
        
        socket?.emit("message", messageData)
    }
    
    func startTyping() {
        guard let roomId = currentRoomId else { return }
        
        typingTimer?.invalidate()
        socket?.emit("typing", ["roomId": roomId, "isTyping": true])
        
        typingTimer = Timer.scheduledTimer(withTimeInterval: 3.0, repeats: false) { [weak self] _ in
            self?.stopTyping()
        }
    }
    
    func stopTyping() {
        guard let roomId = currentRoomId else { return }
        
        typingTimer?.invalidate()
        typingTimer = nil
        socket?.emit("typing", ["roomId": roomId, "isTyping": false])
    }
    
    func markMessageAsRead(messageId: String) {
        socket?.emit("read", ["messageId": messageId])
    }
    
    func updateUserStatus(isOnline: Bool) {
        socket?.emit("userStatus", ["isOnline": isOnline])
    }
    
    func sendFile(_ fileUrl: String, fileName: String, fileType: String, to roomId: String) {
        let messageData: [String: Any] = [
            "roomId": roomId,
            "content": fileUrl,
            "type": fileType,
            "fileName": fileName
        ]
        socket?.emit("message", messageData)
    }
}

// MARK: - Models
struct ChatMessage: Codable {
    let id: String
    let roomId: String
    let senderId: String
    let senderName: String
    let content: String
    let type: MessageType
    let fileName: String?
    let createdAt: Date
    
    enum MessageType: String, Codable {
        case text
        case image
        case file
    }
    
    init(from dictionary: [String: Any]) throws {
        guard let id = dictionary["id"] as? String,
              let roomId = dictionary["roomId"] as? String,
              let senderId = dictionary["senderId"] as? String,
              let senderName = dictionary["senderName"] as? String,
              let content = dictionary["content"] as? String,
              let typeString = dictionary["type"] as? String,
              let type = MessageType(rawValue: typeString),
              let createdAtString = dictionary["createdAt"] as? String,
              let createdAt = ISO8601DateFormatter().date(from: createdAtString) else {
            throw NSError(domain: "ChatMessage", code: -1, userInfo: [NSLocalizedDescriptionKey: "Invalid message data"])
        }
        
        self.id = id
        self.roomId = roomId
        self.senderId = senderId
        self.senderName = senderName
        self.content = content
        self.type = type
        self.fileName = dictionary["fileName"] as? String
        self.createdAt = createdAt
    }
} 