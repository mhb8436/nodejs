import SwiftUI

struct LoginView: View {
    @StateObject private var viewModel = LoginViewModel()
    @State private var email = ""
    @State private var password = ""
    @State private var showingAlert = false
    @State private var alertMessage = ""
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Chat App")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                
                TextField("Email", text: $email)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .textContentType(.emailAddress)
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
                
                SecureField("Password", text: $password)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .textContentType(.password)
                
                Button(action: {
                    Task {
                        await viewModel.login(email: email, password: password)
                    }
                }) {
                    if viewModel.isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    } else {
                        Text("Login")
                            .frame(maxWidth: .infinity)
                    }
                }
                .buttonStyle(.borderedProminent)
                .disabled(viewModel.isLoading)
                
                Button(action: {
                    Task {
                        await viewModel.register(email: email, password: password)
                    }
                }) {
                    Text("Register")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.bordered)
                .disabled(viewModel.isLoading)
            }
            .padding()
            .alert("Error", isPresented: $viewModel.showingAlert) {
                Button("OK", role: .cancel) {}
            } message: {
                Text(viewModel.alertMessage)
            }
            .navigationDestination(isPresented: $viewModel.isLoggedIn) {
                ChatListView()
            }
        }
    }
}

class LoginViewModel: ObservableObject {
    @Published var isLoading = false
    @Published var showingAlert = false
    @Published var alertMessage = ""
    @Published var isLoggedIn = false
    
    func login(email: String, password: String) async {
        guard !email.isEmpty, !password.isEmpty else {
            await MainActor.run {
                alertMessage = "Please enter both email and password"
                showingAlert = true
            }
            return
        }
        
        await MainActor.run {
            isLoading = true
        }
        
        do {
            let response = try await NetworkService.shared.login(email: email, password: password)
            NetworkService.shared.setAuthToken(response.token)
            
            await MainActor.run {
                isLoading = false
                isLoggedIn = true
            }
        } catch {
            await MainActor.run {
                isLoading = false
                alertMessage = error.localizedDescription
                showingAlert = true
            }
        }
    }
    
    func register(email: String, password: String) async {
        guard !email.isEmpty, !password.isEmpty else {
            await MainActor.run {
                alertMessage = "Please enter both email and password"
                showingAlert = true
            }
            return
        }
        
        await MainActor.run {
            isLoading = true
        }
        
        do {
            let response = try await NetworkService.shared.register(email: email, password: password, username: email)
            NetworkService.shared.setAuthToken(response.token)
            
            await MainActor.run {
                isLoading = false
                isLoggedIn = true
            }
        } catch {
            await MainActor.run {
                isLoading = false
                alertMessage = error.localizedDescription
                showingAlert = true
            }
        }
    }
}

#Preview {
    LoginView()
} 