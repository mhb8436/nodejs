import Foundation
import Combine

class BoardViewModel: ObservableObject {
    @Published var posts: [Post] = []
    @Published var selectedPost: Post?
    var token: String

    init(token: String = "") {
        self.token = token
    }

    func fetchPosts() {
        Task {
            do {
                let fetchedPosts = try await APIService.shared.fetchPosts()
                await MainActor.run {
                    self.posts = fetchedPosts
                }
            } catch {
                print("Error fetching posts: \(error)")
            }
        }
    }

    func fetchPostDetail(postId: Int) {
        Task {
            do {
                if let post = try await APIService.shared.fetchPostDetail(postId: postId) {
                    await MainActor.run {
                        self.selectedPost = post
                    }
                }
            } catch {
                print("Error fetching post detail: \(error)")
            }
        }
    }
}
