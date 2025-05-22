import SwiftUI

struct ChatListView: View {
    @StateObject private var viewModel = ChatListViewModel()
    @State private var searchText = ""
    @State private var showingCreateRoomAlert = false
    @State private var newRoomName = ""
    
    var body: some View {
        List {
            ForEach(filteredRooms) { room in
                NavigationLink(destination: ChatRoomView(roomId: room.id, roomName: room.name)) {
                    ChatRoomRow(room: room)
                }
            }
        }
        .navigationTitle("Chat Rooms")
        .searchable(text: $searchText, prompt: "Search rooms")
        .refreshable {
            await viewModel.fetchChatRooms()
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button(action: { showingCreateRoomAlert = true }) {
                    Image(systemName: "square.and.pencil")
                }
            }
            ToolbarItem(placement: .navigationBarLeading) {
                Button("Logout") {
                    viewModel.logout()
                }
            }
        }
        .alert("Create Chat Room", isPresented: $showingCreateRoomAlert) {
            TextField("Room Name", text: $newRoomName)
            Button("Cancel", role: .cancel) {
                newRoomName = ""
            }
            Button("Create") {
                Task {
                    await viewModel.createRoom(name: newRoomName)
                    newRoomName = ""
                }
            }
        }
        .alert("Error", isPresented: $viewModel.showingAlert) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(viewModel.alertMessage)
        }
        .task {
            await viewModel.fetchChatRooms()
        }
    }
    
    private var filteredRooms: [ChatRoom] {
        if searchText.isEmpty {
            return viewModel.chatRooms
        } else {
            return viewModel.chatRooms.filter { room in
                room.name.localizedCaseInsensitiveContains(searchText)
            }
        }
    }
}

struct ChatRoomRow: View {
    let room: ChatRoom
    
    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(room.name)
                .font(.headline)
            
            if let lastMessage = room.lastMessage {
                Text(lastMessage)
                    .font(.subheadline)
                    .foregroundColor(.gray)
                    .lineLimit(1)
            }
            
            HStack {
                if let lastMessageTime = room.lastMessageTime {
                    Text(lastMessageTime, style: .time)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                Spacer()
                
                if room.unreadCount > 0 {
                    Text("\(room.unreadCount)")
                        .font(.caption)
                        .foregroundColor(.white)
                        .padding(6)
                        .background(Color.blue)
                        .clipShape(Circle())
                }
            }
        }
        .padding(.vertical, 4)
    }
}

class ChatListViewModel: ObservableObject {
    @Published var chatRooms: [ChatRoom] = []
    @Published var showingAlert = false
    @Published var alertMessage = ""
    
    func fetchChatRooms() async {
        do {
            let rooms = try await NetworkService.shared.getRooms()
            await MainActor.run {
                self.chatRooms = rooms
            }
        } catch {
            await MainActor.run {
                alertMessage = error.localizedDescription
                showingAlert = true
            }
        }
    }
    
    func createRoom(name: String) async {
        guard !name.isEmpty else { return }
        
        do {
            let room = try await NetworkService.shared.createRoom(name: name)
            await MainActor.run {
                chatRooms.append(room)
            }
        } catch {
            await MainActor.run {
                alertMessage = error.localizedDescription
                showingAlert = true
            }
        }
    }
    
    func logout() {
        NetworkService.shared.setAuthToken(nil)
        SocketService.shared.disconnect()
        // Navigate back to login view
        NotificationCenter.default.post(name: NSNotification.Name("Logout"), object: nil)
    }
}

#Preview {
    NavigationView {
        ChatListView()
    }
} 