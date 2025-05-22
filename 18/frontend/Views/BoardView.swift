import SwiftUI

struct BoardView: View {
    @ObservedObject var viewModel: BoardViewModel

    var body: some View {
        NavigationView {
            List(viewModel.posts) { post in
                NavigationLink(destination: PostDetailView(post: post)) {
                    VStack(alignment: .leading) {
                        Text(post.title).font(.headline)
                        Text(post.content).font(.subheadline).lineLimit(2)
                    }
                }
            }
            .navigationTitle("게시판")
            .toolbar {
                Button("글쓰기") {
                    // 글 작성 로직
                }
            }
        }
        .onAppear {
            viewModel.fetchPosts()
        }
    }
}
