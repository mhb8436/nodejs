import SwiftUI
import PhotosUI

struct ChatRoomView: View {
    let roomId: String
    let roomName: String
    
    @StateObject private var viewModel: ChatRoomViewModel
    @State private var messageText = ""
    @State private var showingImagePicker = false
    @State private var selectedItem: PhotosPickerItem?
    @FocusState private var isInputFocused: Bool
    
    init(roomId: String, roomName: String) {
        self.roomId = roomId
        self.roomName = roomName
        _viewModel = StateObject(wrappedValue: ChatRoomViewModel(roomId: roomId))
    }
    
    var body: some View {
        VStack(spacing: 0) {
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(spacing: 8) {
                        ForEach(viewModel.messages) { message in
                            MessageView(message: message, isCurrentUser: message.senderId == NetworkService.shared.currentUserId)
                                .id(message.id)
                        }
                    }
                    .padding()
                }
                .onChange(of: viewModel.messages) { _ in
                    if let lastMessage = viewModel.messages.last {
                        withAnimation {
                            proxy.scrollTo(lastMessage.id, anchor: .bottom)
                        }
                    }
                }
            }
            
            if !viewModel.typingUsers.isEmpty {
                HStack {
                    Text(typingIndicatorText)
                        .font(.caption)
                        .foregroundColor(.gray)
                    Spacer()
                }
                .padding(.horizontal)
            }
            
            HStack(spacing: 12) {
                PhotosPicker(selection: $selectedItem, matching: .any(of: [.images, .videos, .documents])) {
                    Image(systemName: "paperclip")
                        .font(.system(size: 20))
                }
                
                TextField("Type a message...", text: $messageText)
                    .textFieldStyle(.roundedBorder)
                    .focused($isInputFocused)
                
                Button(action: sendMessage) {
                    Image(systemName: "arrow.up.circle.fill")
                        .font(.system(size: 24))
                }
                .disabled(messageText.isEmpty)
            }
            .padding()
            .background(Color(.systemBackground))
            .overlay(
                Rectangle()
                    .frame(height: 1)
                    .foregroundColor(Color(.systemGray4)),
                alignment: .top
            )
        }
        .navigationTitle(roomName)
        .navigationBarTitleDisplayMode(.inline)
        .onChange(of: selectedItem) { newItem in
            Task {
                if let data = try? await newItem?.loadTransferable(type: Data.self),
                   let url = saveFile(data: data) {
                    await viewModel.sendFile(url: url)
                }
            }
        }
        .alert("Error", isPresented: $viewModel.showingAlert) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(viewModel.alertMessage)
        }
        .onAppear {
            viewModel.connect()
        }
        .onDisappear {
            viewModel.disconnect()
        }
    }
    
    private var typingIndicatorText: String {
        if viewModel.typingUsers.count == 1 {
            return "\(viewModel.typingUsers.first!) is typing..."
        } else if viewModel.typingUsers.count > 1 {
            return "\(viewModel.typingUsers.count) people are typing..."
        }
        return ""
    }
    
    private func sendMessage() {
        guard !messageText.isEmpty else { return }
        Task {
            await viewModel.sendMessage(messageText)
            messageText = ""
        }
    }
    
    private func saveFile(data: Data) -> URL? {
        let tempDir = FileManager.default.temporaryDirectory
        let fileName = UUID().uuidString
        let fileURL = tempDir.appendingPathComponent(fileName)
        
        do {
            try data.write(to: fileURL)
            return fileURL
        } catch {
            print("Error saving file: \(error)")
            return nil
        }
    }
}

struct MessageView: View {
    let message: ChatMessage
    let isCurrentUser: Bool
    
    var body: some View {
        HStack {
            if isCurrentUser { Spacer() }
            
            VStack(alignment: isCurrentUser ? .trailing : .leading, spacing: 4) {
                if !isCurrentUser {
                    Text(message.senderName)
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                switch message.type {
                case .text:
                    Text(message.content)
                        .padding(12)
                        .background(isCurrentUser ? Color.blue : Color(.systemGray5))
                        .foregroundColor(isCurrentUser ? .white : .primary)
                        .cornerRadius(16)
                case .image:
                    AsyncImage(url: URL(string: message.content)) { image in
                        image
                            .resizable()
                            .scaledToFit()
                            .frame(maxWidth: 200)
                            .cornerRadius(12)
                    } placeholder: {
                        ProgressView()
                    }
                case .file:
                    HStack {
                        Image(systemName: "doc.fill")
                        Text(message.fileName ?? "File")
                    }
                    .padding(12)
                    .background(Color(.systemGray5))
                    .cornerRadius(12)
                }
                
                Text(message.createdAt, style: .time)
                    .font(.caption2)
                    .foregroundColor(.gray)
            }
            
            if !isCurrentUser { Spacer() }
        }
    }
}

class ChatRoomViewModel: ObservableObject, SocketServiceDelegate {
    @Published var messages: [ChatMessage] = []
    @Published var typingUsers: Set<String> = []
    @Published var showingAlert = false
    @Published var alertMessage = ""
    
    private let roomId: String
    
    init(roomId: String) {
        self.roomId = roomId
    }
    
    func connect() {
        SocketService.shared.delegate = self
        SocketService.shared.connect()
        SocketService.shared.joinRoom(roomId: roomId)
    }
    
    func disconnect() {
        SocketService.shared.leaveRoom(roomId: roomId)
    }
    
    func sendMessage(_ text: String) async {
        SocketService.shared.sendMessage(roomId: roomId, content: text, type: .text)
    }
    
    func sendFile(url: URL) async {
        do {
            let response = try await NetworkService.shared.uploadFile(fileURL: url)
            SocketService.shared.sendMessage(
                roomId: roomId,
                content: response.url,
                type: response.type == "image" ? .image : .file,
                fileName: response.metadata.originalName
            )
        } catch {
            await MainActor.run {
                alertMessage = error.localizedDescription
                showingAlert = true
            }
        }
    }
    
    // MARK: - SocketServiceDelegate
    
    func didReceiveMessage(_ message: ChatMessage) {
        Task { @MainActor in
            messages.append(message)
            try? await NetworkService.shared.markMessagesAsRead(roomId: roomId)
        }
    }
    
    func didConnect() {
        print("Socket connected")
    }
    
    func didDisconnect() {
        print("Socket disconnected")
    }
    
    func didReceiveError(_ error: Error) {
        Task { @MainActor in
            alertMessage = error.localizedDescription
            showingAlert = true
        }
    }
    
    func didReceiveTypingStatus(userId: String, roomId: String, isTyping: Bool) {
        guard roomId == self.roomId else { return }
        
        Task { @MainActor in
            if isTyping {
                typingUsers.insert(userId)
            } else {
                typingUsers.remove(userId)
            }
        }
    }
    
    func didReceiveReadStatus(messageId: String, userId: String) {
        // Update read status in UI if needed
    }
    
    func didReceiveUserStatus(userId: String, isOnline: Bool, lastSeen: Date?) {
        // Update user status in UI if needed
    }
}

#Preview {
    NavigationView {
        ChatRoomView(roomId: "preview", roomName: "Preview Room")
    }
} 