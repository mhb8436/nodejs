import SwiftUI

@main
struct ChatAppApp: App {
    @StateObject var authVM = AuthViewModel()
    var body: some Scene {
        WindowGroup {
            if authVM.isLoggedIn, let token = authVM.token {
                MainTabView(token: token)
            } else {
                AuthView(viewModel: authVM)
            }
        }
    }
}

struct MainTabView: View {
    let token: String
    @StateObject private var boardVM: BoardViewModel
    @StateObject var chatListVM = ChatListViewModel()
    
    init(token: String) {
        self.token = token
        _boardVM = StateObject(wrappedValue: BoardViewModel(token: token))
    }
    
    var body: some View {
        TabView {
            BoardView(viewModel: boardVM, token: token)
                .tabItem { Label("게시판", systemImage: "doc.text") }
            ChatListView(viewModel: chatListVM, token: token)
                .tabItem { Label("채팅", systemImage: "bubble.left.and.bubble.right") }
        }
    }
}
