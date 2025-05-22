import Foundation
import Alamofire

class APIService {
    static let shared = APIService()
    let baseURL = "http://localhost:3000" // 실제 서버 주소로 변경

    // 회원가입
    func signup(email: String, password: String, nickname: String, completion: @escaping (Bool) -> Void) {
        let params = ["email": email, "password": password, "nickname": nickname]
        AF.request("\(baseURL)/auth/signup", method: .post, parameters: params, encoding: JSONEncoding.default)
            .validate().response { response in
                completion(response.error == nil)
            }
    }

    // 로그인
    func login(email: String, password: String, completion: @escaping (String?) -> Void) {
        let params = ["email": email, "password": password]
        AF.request("\(baseURL)/auth/login", method: .post, parameters: params, encoding: JSONEncoding.default)
            .validate().responseDecodable(of: LoginResponse.self) { response in
                completion(response.value?.access_token)
            }
    }

    // 게시판 글 목록
    func fetchPosts(completion: @escaping ([Post]) -> Void) {
        AF.request("\(baseURL)/board/posts").responseDecodable(of: [Post].self) { response in
            completion(response.value ?? [])
        }
    }

    // 게시글 상세
    func fetchPostDetail(postId: Int, completion: @escaping (Post?) -> Void) {
        AF.request("\(baseURL)/board/posts/\(postId)").responseDecodable(of: Post.self) { response in
            completion(response.value)
        }
    }

    // 글 작성
    func createPost(title: String, content: String, token: String, completion: @escaping (Bool) -> Void) {
        let params = ["title": title, "content": content]
        let headers: HTTPHeaders = ["Authorization": "Bearer \(token)"]
        AF.request("\(baseURL)/board/posts", method: .post, parameters: params, encoding: JSONEncoding.default, headers: headers)
            .validate().response { response in
                completion(response.error == nil)
            }
    }

    // 댓글 작성
    func createAnswer(postId: Int, content: String, token: String, completion: @escaping (Bool) -> Void) {
        let params = ["content": content]
        let headers: HTTPHeaders = ["Authorization": "Bearer \(token)"]
        AF.request("\(baseURL)/board/posts/\(postId)/answers", method: .post, parameters: params, encoding: JSONEncoding.default, headers: headers)
            .validate().response { response in
                completion(response.error == nil)
            }
    }

    // 채팅방 목록
    func fetchChatRooms(completion: @escaping ([ChatRoom]) -> Void) {
        AF.request("\(baseURL)/chat/rooms").responseDecodable(of: [ChatRoom].self) { response in
            completion(response.value ?? [])
        }
    }

    // 채팅방 생성
    func createChatRoom(name: String, token: String, completion: @escaping (Bool) -> Void) {
        let params = ["name": name]
        let headers: HTTPHeaders = ["Authorization": "Bearer \(token)"]
        AF.request("\(baseURL)/chat/rooms", method: .post, parameters: params, encoding: JSONEncoding.default, headers: headers)
            .validate().response { response in
                completion(response.error == nil)
            }
    }

    // 메시지 목록
    func fetchMessages(chatRoomId: Int, completion: @escaping ([Message]) -> Void) {
        AF.request("\(baseURL)/chat/rooms/\(chatRoomId)/messages").responseDecodable(of: [Message].self) { response in
            completion(response.value ?? [])
        }
    }
}

struct LoginResponse: Codable {
    let access_token: String
}
