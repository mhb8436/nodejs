import Foundation
import Combine

class BoardViewModel: ObservableObject {
    @Published var posts: [Post] = []
    @Published var selectedPost: Post?

    func fetchPosts() {
        APIService.shared.fetchPosts { posts in
            DispatchQueue.main.async {
                self.posts = posts
            }
        }
    }

    func fetchPostDetail(postId: Int) {
        APIService.shared.fetchPostDetail(postId: postId) { post in
            DispatchQueue.main.async {
                self.selectedPost = post
            }
        }
    }
}
