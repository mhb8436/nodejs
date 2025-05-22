import SwiftUI

struct ChatListView: View {
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
                    // 방 생성 로직
                }
            }
        }
        .onAppear {
            viewModel.fetchRooms()
        }
    }
}
