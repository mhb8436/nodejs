import UIKit
import PhotosUI

class ChatRoomViewController: UIViewController {
    private let roomId: String
    private let roomName: String
    
    private let tableView: UITableView = {
        let tableView = UITableView()
        tableView.register(MessageCell.self, forCellReuseIdentifier: MessageCell.reuseIdentifier)
        tableView.separatorStyle = .none
        tableView.backgroundColor = .systemBackground
        tableView.translatesAutoresizingMaskIntoConstraints = false
        return tableView
    }()
    
    private let messageInputView: UIView = {
        let view = UIView()
        view.backgroundColor = .systemBackground
        view.layer.borderWidth = 1
        view.layer.borderColor = UIColor.systemGray4.cgColor
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    private let messageTextField: UITextField = {
        let textField = UITextField()
        textField.placeholder = "Type a message..."
        textField.borderStyle = .roundedRect
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    }()
    
    private let sendButton: UIButton = {
        let button = UIButton(type: .system)
        button.setImage(UIImage(systemName: "arrow.up.circle.fill"), for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let attachButton: UIButton = {
        let button = UIButton(type: .system)
        button.setImage(UIImage(systemName: "paperclip"), for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let typingIndicatorLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 12)
        label.textColor = .gray
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private var messages: [ChatMessage] = []
    private var keyboardHeight: CGFloat = 0
    private var typingUsers: Set<String> = []
    private var typingTimer: Timer?
    
    init(roomId: String, roomName: String) {
        self.roomId = roomId
        self.roomName = roomName
        super.init(nibName: nil, bundle: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupViews()
        setupActions()
        setupTableView()
        setupKeyboardObservers()
        connectToSocket()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        SocketService.shared.leaveRoom(roomId: roomId)
    }
    
    private func setupViews() {
        view.backgroundColor = .systemBackground
        title = roomName
        
        view.addSubview(tableView)
        view.addSubview(messageInputView)
        messageInputView.addSubview(messageTextField)
        messageInputView.addSubview(sendButton)
        messageInputView.addSubview(attachButton)
        view.addSubview(typingIndicatorLabel)
        
        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: messageInputView.topAnchor),
            
            messageInputView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            messageInputView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            messageInputView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
            messageInputView.heightAnchor.constraint(equalToConstant: 60),
            
            attachButton.leadingAnchor.constraint(equalTo: messageInputView.leadingAnchor, constant: 8),
            attachButton.centerYAnchor.constraint(equalTo: messageInputView.centerYAnchor),
            attachButton.widthAnchor.constraint(equalToConstant: 44),
            attachButton.heightAnchor.constraint(equalToConstant: 44),
            
            messageTextField.leadingAnchor.constraint(equalTo: attachButton.trailingAnchor, constant: 8),
            messageTextField.centerYAnchor.constraint(equalTo: messageInputView.centerYAnchor),
            messageTextField.trailingAnchor.constraint(equalTo: sendButton.leadingAnchor, constant: -8),
            messageTextField.heightAnchor.constraint(equalToConstant: 36),
            
            sendButton.trailingAnchor.constraint(equalTo: messageInputView.trailingAnchor, constant: -8),
            sendButton.centerYAnchor.constraint(equalTo: messageInputView.centerYAnchor),
            sendButton.widthAnchor.constraint(equalToConstant: 44),
            sendButton.heightAnchor.constraint(equalToConstant: 44),
            
            typingIndicatorLabel.leadingAnchor.constraint(equalTo: messageInputView.leadingAnchor, constant: 16),
            typingIndicatorLabel.bottomAnchor.constraint(equalTo: messageInputView.topAnchor, constant: -4),
            typingIndicatorLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -16)
        ])
    }
    
    private func setupActions() {
        sendButton.addTarget(self, action: #selector(sendButtonTapped), for: .touchUpInside)
        attachButton.addTarget(self, action: #selector(attachButtonTapped), for: .touchUpInside)
        messageTextField.delegate = self
        messageTextField.addTarget(self, action: #selector(textFieldDidChange), for: .editingChanged)
    }
    
    private func setupTableView() {
        tableView.delegate = self
        tableView.dataSource = self
    }
    
    private func setupKeyboardObservers() {
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    
    private func connectToSocket() {
        SocketService.shared.delegate = self
        SocketService.shared.connect()
        SocketService.shared.joinRoom(roomId: roomId)
    }
    
    @objc private func sendButtonTapped() {
        guard let message = messageTextField.text, !message.isEmpty else { return }
        sendMessage(message)
        messageTextField.text = ""
    }
    
    @objc private func attachButtonTapped() {
        var configuration = PHPickerConfiguration()
        configuration.filter = .any(of: [.images, .videos, .documents])
        configuration.selectionLimit = 1
        
        let picker = PHPickerViewController(configuration: configuration)
        picker.delegate = self
        present(picker, animated: true)
    }
    
    @objc private func keyboardWillShow(_ notification: Notification) {
        guard let keyboardFrame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else { return }
        keyboardHeight = keyboardFrame.height
        
        UIView.animate(withDuration: 0.3) {
            self.messageInputView.transform = CGAffineTransform(translationX: 0, y: -self.keyboardHeight)
            self.tableView.transform = CGAffineTransform(translationX: 0, y: -self.keyboardHeight)
        }
    }
    
    @objc private func keyboardWillHide(_ notification: Notification) {
        UIView.animate(withDuration: 0.3) {
            self.messageInputView.transform = .identity
            self.tableView.transform = .identity
        }
        keyboardHeight = 0
    }
    
    @objc private func textFieldDidChange() {
        SocketService.shared.startTyping(roomId: roomId)
        
        typingTimer?.invalidate()
        typingTimer = Timer.scheduledTimer(withTimeInterval: 3.0, repeats: false) { [weak self] _ in
            self?.stopTyping()
        }
    }
    
    private func stopTyping() {
        SocketService.shared.stopTyping(roomId: roomId)
    }
    
    private func updateTypingIndicator() {
        if typingUsers.isEmpty {
            typingIndicatorLabel.text = ""
        } else if typingUsers.count == 1 {
            typingIndicatorLabel.text = "\(typingUsers.first!) is typing..."
        } else {
            typingIndicatorLabel.text = "\(typingUsers.count) people are typing..."
        }
    }
    
    private func markMessagesAsRead() {
        Task {
            do {
                try await NetworkService.shared.markMessagesAsRead(roomId: roomId)
            } catch {
                print("Error marking messages as read: \(error.localizedDescription)")
            }
        }
    }
    
    private func sendMessage(_ message: String) {
        SocketService.shared.sendMessage(roomId: roomId, content: message, type: .text)
    }
    
    private func sendFile(_ fileURL: URL, type: MessageType) {
        Task {
            do {
                let response = try await NetworkService.shared.uploadFile(fileURL: fileURL)
                SocketService.shared.sendMessage(roomId: roomId, content: response.url, type: type, fileName: response.metadata.originalName)
            } catch {
                DispatchQueue.main.async { [weak self] in
                    self?.showAlert(title: "Error", message: error.localizedDescription)
                }
            }
        }
    }
    
    private func showAlert(title: String, message: String) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
}

extension ChatRoomViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return messages.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: MessageCell.reuseIdentifier, for: indexPath) as! MessageCell
        let message = messages[indexPath.row]
        let isCurrentUser = message.senderId == NetworkService.shared.currentUserId
        cell.configure(with: message, isCurrentUser: isCurrentUser)
        return cell
    }
    
    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        if indexPath.row == messages.count - 1 {
            markMessagesAsRead()
        }
    }
}

extension ChatRoomViewController: UITextFieldDelegate {
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        sendButtonTapped()
        return true
    }
}

extension ChatRoomViewController: PHPickerViewControllerDelegate {
    func picker(_ picker: PHPickerViewController, didFinishPicking results: [PHPickerResult]) {
        picker.dismiss(animated: true)
        
        guard let result = results.first else { return }
        
        if result.itemProvider.hasItemConformingToTypeIdentifier(UTType.image.identifier) {
            result.itemProvider.loadFileRepresentation(forTypeIdentifier: UTType.image.identifier) { [weak self] url, error in
                if let error = error {
                    DispatchQueue.main.async {
                        self?.showAlert(title: "Error", message: error.localizedDescription)
                    }
                    return
                }
                
                if let url = url {
                    self?.sendFile(url, type: .image)
                }
            }
        } else if result.itemProvider.hasItemConformingToTypeIdentifier(UTType.pdf.identifier) {
            result.itemProvider.loadFileRepresentation(forTypeIdentifier: UTType.pdf.identifier) { [weak self] url, error in
                if let error = error {
                    DispatchQueue.main.async {
                        self?.showAlert(title: "Error", message: error.localizedDescription)
                    }
                    return
                }
                
                if let url = url {
                    self?.sendFile(url, type: .file)
                }
            }
        }
    }
}

extension ChatRoomViewController: SocketServiceDelegate {
    func didReceiveMessage(_ message: ChatMessage) {
        DispatchQueue.main.async { [weak self] in
            self?.messages.append(message)
            self?.tableView.reloadData()
            self?.tableView.scrollToRow(at: IndexPath(row: self?.messages.count ?? 0 - 1, section: 0), at: .bottom, animated: true)
        }
    }
    
    func didConnect() {
        print("Socket connected")
    }
    
    func didDisconnect() {
        print("Socket disconnected")
    }
    
    func didReceiveError(_ error: Error) {
        DispatchQueue.main.async { [weak self] in
            self?.showAlert(title: "Error", message: error.localizedDescription)
        }
    }
    
    func didReceiveTypingStatus(userId: String, roomId: String, isTyping: Bool) {
        guard roomId == self.roomId else { return }
        
        if isTyping {
            typingUsers.insert(userId)
        } else {
            typingUsers.remove(userId)
        }
        
        DispatchQueue.main.async { [weak self] in
            self?.updateTypingIndicator()
        }
    }
    
    func didReceiveReadStatus(messageId: String, userId: String) {
        if let index = messages.firstIndex(where: { $0.id == messageId }) {
            DispatchQueue.main.async { [weak self] in
                self?.tableView.reloadRows(at: [IndexPath(row: index, section: 0)], with: .none)
            }
        }
    }
    
    func didReceiveUserStatus(userId: String, isOnline: Bool, lastSeen: Date?) {
        // Update user status in UI if needed
    }
} 