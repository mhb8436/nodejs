import Foundation
import Combine

class AuthViewModel: ObservableObject {
    @Published var token: String?
    @Published var isLoggedIn = false
    @Published var loginError: String?
    @Published var signupError: String?

    private let tokenKey = "jwt_token"

    init() {
        // 앱 실행 시 토큰 불러오기
        if let savedToken = UserDefaults.standard.string(forKey: tokenKey) {
            self.token = savedToken
            self.isLoggedIn = true
        }
    }

    func login(email: String, password: String) {
        APIService.shared.login(email: email, password: password) { token in
            DispatchQueue.main.async {
                if let token = token {
                    self.token = token
                    self.isLoggedIn = true
                    UserDefaults.standard.set(token, forKey: self.tokenKey)
                } else {
                    self.loginError = "로그인 실패"
                }
            }
        }
    }

    func signup(email: String, password: String, nickname: String) {
        APIService.shared.signup(email: email, password: password, nickname: nickname) { success in
            DispatchQueue.main.async {
                if success {
                    self.loginError = nil
                } else {
                    self.signupError = "회원가입 실패"
                }
            }
        }
    }

    func logout() {
        self.token = nil
        self.isLoggedIn = false
        UserDefaults.standard.removeObject(forKey: tokenKey)
    }
}

