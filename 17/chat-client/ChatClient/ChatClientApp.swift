import SwiftUI

@main
struct ChatClientApp: App {
    @State private var isLoggedIn = false
    
    var body: some Scene {
        WindowGroup {
            Group {
                if isLoggedIn {
                    NavigationView {
                        ChatListView()
                    }
                } else {
                    LoginView()
                }
            }
            .onReceive(NotificationCenter.default.publisher(for: NSNotification.Name("Logout"))) { _ in
                isLoggedIn = false
            }
            .onReceive(NotificationCenter.default.publisher(for: NSNotification.Name("Login"))) { _ in
                isLoggedIn = true
            }
        }
    }
} 