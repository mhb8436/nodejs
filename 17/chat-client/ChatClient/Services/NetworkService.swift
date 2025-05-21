import Foundation

enum NetworkError: Error {
    case invalidURL
    case invalidResponse
    case decodingError
    case serverError(String)
}

class NetworkService {
    static let shared = NetworkService()
    private let baseURL = "http://localhost:3000"
    private var authToken: String?
    private(set) var currentUserId: String?
    
    private init() {}
    
    func setAuthToken(_ token: String?) {
        self.authToken = token
        if token == nil {
            self.currentUserId = nil
        }
    }
    
    private func createRequest(_ endpoint: String, method: String = "GET", body: Data? = nil) -> URLRequest? {
        guard let url = URL(string: baseURL + endpoint) else { return nil }
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        if let token = authToken {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        if let body = body {
            request.httpBody = body
        }
        
        return request
    }
    
    func login(email: String, password: String) async throws -> AuthResponse {
        let body = try JSONEncoder().encode([
            "email": email,
            "password": password
        ])
        
        guard let request = createRequest("/auth/login", method: "POST", body: body) else {
            throw NetworkError.invalidURL
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        do {
            let authResponse = try JSONDecoder().decode(AuthResponse.self, from: data)
            setAuthToken(authResponse.token)
            currentUserId = authResponse.user.id
            return authResponse
        } catch {
            throw NetworkError.decodingError
        }
    }
    
    func register(email: String, password: String, username: String) async throws -> AuthResponse {
        let body = try JSONEncoder().encode([
            "email": email,
            "password": password,
            "username": username
        ])
        
        guard let request = createRequest("/auth/register", method: "POST", body: body) else {
            throw NetworkError.invalidURL
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        do {
            let authResponse = try JSONDecoder().decode(AuthResponse.self, from: data)
            setAuthToken(authResponse.token)
            currentUserId = authResponse.user.id
            return authResponse
        } catch {
            throw NetworkError.decodingError
        }
    }
    
    func uploadFile(fileURL: URL) async throws -> FileUploadResponse {
        let fileData = try Data(contentsOf: fileURL)
        let fileName = fileURL.lastPathComponent
        let mimeType = fileURL.mimeType ?? "application/octet-stream"
        return try await uploadFile(fileData, fileName: fileName, mimeType: mimeType)
    }
    
    func uploadFile(_ fileData: Data, fileName: String, mimeType: String) async throws -> FileUploadResponse {
        let boundary = UUID().uuidString
        var request = URLRequest(url: URL(string: baseURL + "/upload")!)
        request.httpMethod = "POST"
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        
        if let token = authToken {
            request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        }
        
        var body = Data()
        body.append("--\(boundary)\r\n".data(using: .utf8)!)
        body.append("Content-Disposition: form-data; name=\"file\"; filename=\"\(fileName)\"\r\n".data(using: .utf8)!)
        body.append("Content-Type: \(mimeType)\r\n\r\n".data(using: .utf8)!)
        body.append(fileData)
        body.append("\r\n--\(boundary)--\r\n".data(using: .utf8)!)
        
        request.httpBody = body
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        do {
            return try JSONDecoder().decode(FileUploadResponse.self, from: data)
        } catch {
            throw NetworkError.decodingError
        }
    }
    
    // MARK: - User Profile
    func updateProfile(username: String, avatar: Data?) async throws -> User {
        var body: [String: Any] = ["username": username]
        
        if let avatar = avatar {
            let base64Avatar = avatar.base64EncodedString()
            body["avatar"] = base64Avatar
        }
        
        let jsonData = try JSONSerialization.data(withJSONObject: body)
        
        guard let request = createRequest("/users/profile", method: "PUT", body: jsonData) else {
            throw NetworkError.invalidURL
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        return try JSONDecoder().decode(User.self, from: data)
    }
    
    // MARK: - Chat Rooms
    func searchRooms(query: String) async throws -> [ChatRoom] {
        guard let request = createRequest("/rooms/search?q=\(query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? "")") else {
            throw NetworkError.invalidURL
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        return try JSONDecoder().decode([ChatRoom].self, from: data)
    }
    
    func getRooms() async throws -> [ChatRoom] {
        guard let request = createRequest("/rooms") else {
            throw NetworkError.invalidURL
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        return try JSONDecoder().decode([ChatRoom].self, from: data)
    }
    
    func createRoom(name: String) async throws -> ChatRoom {
        let body = try JSONEncoder().encode(["name": name])
        
        guard let request = createRequest("/rooms", method: "POST", body: body) else {
            throw NetworkError.invalidURL
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        return try JSONDecoder().decode(ChatRoom.self, from: data)
    }
    
    // MARK: - Messages
    func updateMessage(messageId: String, content: String) async throws -> ChatMessage {
        let body = try JSONEncoder().encode(["content": content])
        
        guard let request = createRequest("/messages/\(messageId)", method: "PUT", body: body) else {
            throw NetworkError.invalidURL
        }
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        return try JSONDecoder().decode(ChatMessage.self, from: data)
    }
    
    func deleteMessage(messageId: String) async throws {
        guard let request = createRequest("/messages/\(messageId)", method: "DELETE") else {
            throw NetworkError.invalidURL
        }
        
        let (_, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
    }
    
    func markMessagesAsRead(roomId: String) async throws {
        guard let request = createRequest("/rooms/\(roomId)/read", method: "POST") else {
            throw NetworkError.invalidURL
        }
        
        let (_, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
    }
    
    // MARK: - Push Notifications
    func registerForPushNotifications(deviceToken: String) async throws {
        let body = try JSONEncoder().encode(["deviceToken": deviceToken])
        
        guard let request = createRequest("/users/push-token", method: "POST", body: body) else {
            throw NetworkError.invalidURL
        }
        
        let (_, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
    }
}

// MARK: - Models
struct AuthResponse: Codable {
    let token: String
    let user: User
}

struct User: Codable {
    let id: String
    let email: String
    let username: String
    let avatar: String?
    var isOnline: Bool?
    var lastSeen: Date?
}

struct FileUploadResponse: Codable {
    let url: String
    let type: String
    let metadata: FileMetadata
}

struct FileMetadata: Codable {
    let originalName: String
    let size: Int
    let mimetype: String
}

struct ChatRoom: Codable {
    let id: String
    let name: String
    let lastMessage: String?
    let lastMessageTime: Date?
    let unreadCount: Int
    let participants: [User]
    let isPrivate: Bool
    let createdAt: Date
    let updatedAt: Date
}

struct ChatMessage: Codable {
    let id: String
    let roomId: String
    let senderId: String
    let senderName: String
    let content: String
    let type: MessageType
    let fileName: String?
    let createdAt: Date
    let updatedAt: Date?
    let isEdited: Bool
    let readBy: [String]?
    
    enum MessageType: String, Codable {
        case text
        case image
        case file
    }
}

struct PushNotificationPayload: Codable {
    let title: String
    let body: String
    let roomId: String
    let messageId: String
    let type: String
}

extension URL {
    var mimeType: String? {
        guard let utType = try? resourceValues(forKeys: [.typeIdentifierKey]).typeIdentifier else {
            return nil
        }
        return UTType(utType)?.preferredMIMEType
    }
} 