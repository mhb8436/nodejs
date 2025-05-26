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

    func login(email: String, password: String) async {
        do {
            if let token = try await APIService.shared.login(email: email, password: password) {
                await MainActor.run {
                    self.token = token
                    self.isLoggedIn = true
                    self.loginError = nil
                    UserDefaults.standard.set(token, forKey: self.tokenKey)
                }
            } else {
                await MainActor.run {
                    self.loginError = "로그인 실패"
                    self.isLoggedIn = false
                    self.token = nil
                }
            }
        } catch {
            await MainActor.run {
                self.loginError = "오류: \(error.localizedDescription)"
                self.isLoggedIn = false
                self.token = nil
            }
        }
    }

    func signup(email: String, password: String, nickname: String) async {
        do {
            let success = try await APIService.shared.signup(email: email, password: password, nickname: nickname)
            await MainActor.run {
                if success {
                    self.signupError = nil
                    // 회원가입 성공 시 자동으로 로그인
                    Task {
                        await self.login(email: email, password: password)
                    }
                } else {
                    self.signupError = "회원가입 실패"
                }
            }
        } catch {
            await MainActor.run {
                self.signupError = "오류: \(error.localizedDescription)"
            }
        }
    }

    func logout() {
        self.token = nil
        self.isLoggedIn = false
        UserDefaults.standard.removeObject(forKey: tokenKey)
    }
}

