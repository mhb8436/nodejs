import SwiftUI

struct ChatListView: View {
    @State private var showingCreateRoomAlert = false
    @State private var newRoomName = ""
    @State private var isCreatingRoom = false
    @State private var createRoomError: String?

    @ObservedObject var viewModel: ChatListViewModel
    var token: String

    var body: some View {
        NavigationView {
            List(viewModel.rooms) { room in
                NavigationLink(destination: ChatRoomView(chatRoomId: room.id, token: token)) {
                    Text(room.name)
                }
            }
            .navigationTitle("채팅방 목록")
            .toolbar {
                Button("방 만들기") {
                    showingCreateRoomAlert = true
                }
            }
        }
        .onAppear {
            viewModel.fetchRooms()
        }
    }
    .alert("방 이름 입력", isPresented: $showingCreateRoomAlert, actions: {
        TextField("방 이름", text: $newRoomName)
        Button("생성") {
            Task {
                isCreatingRoom = true
                do {
                    let result = try await APIService.shared.createChatRoom(name: newRoomName, token: token)
                    if result {
                        viewModel.fetchRooms()
                        newRoomName = ""
                    } else {
                        createRoomError = "방 생성 실패"
                    }
                } catch {
                    createRoomError = "오류: \(error.localizedDescription)"
                }
                isCreatingRoom = false
            }
        }
        Button("취소", role: .cancel) {}
    }, message: {
        if let error = createRoomError {
            Text(error)
        }
    })
}
