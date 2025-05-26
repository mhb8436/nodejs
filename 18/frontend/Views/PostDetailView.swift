import SwiftUI

struct PostDetailView: View {
    let post: Post

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(post.title).font(.title2).bold()
            Text(post.content)
            Divider()
            Text("댓글")
                .font(.headline)
            List(post.answers) { answer in
                VStack(alignment: .leading) {
                    Text(answer.user.nickname).font(.subheadline).bold()
                    Text(answer.content)
                }
            }
        }
        .padding()
        .navigationTitle("게시글")
    }
}

#Preview {
    NavigationView {
        PostDetailView(post: Post(
            id: 1,
            title: "샘플 게시글",
            content: "이것은 샘플 게시글의 내용입니다.",
            createdAt: "2024-03-20",
            user: User(id: 1, email: "user@example.com", nickname: "사용자1"),
            answers: [
                Answer(
                    id: 1,
                    content: "샘플 댓글입니다.",
                    createdAt: "2024-03-20",
                    user: User(id: 2, email: "user2@example.com", nickname: "사용자2")
                )
            ]
        ))
    }
}
