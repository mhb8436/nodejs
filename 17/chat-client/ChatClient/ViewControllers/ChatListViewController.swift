import UIKit

struct ChatRoom: Codable {
    let id: String
    let name: String
    let lastMessage: String?
    let lastMessageTime: Date?
    let unreadCount: Int
}

class ChatListViewController: UIViewController {
    private let tableView: UITableView = {
        let tableView = UITableView()
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: "ChatRoomCell")
        tableView.translatesAutoresizingMaskIntoConstraints = false
        return tableView
    }()
    
    private let createRoomButton: UIBarButtonItem = {
        let button = UIBarButtonItem(barButtonSystemItem: .compose, target: nil, action: nil)
        return button
    }()
    
    private let logoutButton: UIBarButtonItem = {
        let button = UIBarButtonItem(title: "Logout", style: .plain, target: nil, action: nil)
        return button
    }()
    
    private var chatRooms: [ChatRoom] = []
    private let refreshControl = UIRefreshControl()
    
    private let searchController: UISearchController = {
        let controller = UISearchController(searchResultsController: nil)
        controller.obscuresBackgroundDuringPresentation = false
        controller.searchBar.placeholder = "Search rooms"
        return controller
    }()
    
    private var filteredRooms: [ChatRoom] = []
    private var isSearching: Bool {
        return searchController.isActive && !(searchController.searchBar.text?.isEmpty ?? true)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupViews()
        setupActions()
        setupTableView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        fetchChatRooms()
    }
    
    private func setupViews() {
        view.backgroundColor = .systemBackground
        title = "Chat Rooms"
        
        navigationItem.rightBarButtonItem = createRoomButton
        navigationItem.leftBarButtonItem = logoutButton
        
        // Add search controller
        navigationItem.searchController = searchController
        navigationItem.hidesSearchBarWhenScrolling = false
        searchController.searchResultsUpdater = self
        searchController.delegate = self
        
        view.addSubview(tableView)
        
        NSLayoutConstraint.activate([
            tableView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            tableView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            tableView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            tableView.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
    }
    
    private func setupActions() {
        createRoomButton.target = self
        createRoomButton.action = #selector(createRoomButtonTapped)
        
        logoutButton.target = self
        logoutButton.action = #selector(logoutButtonTapped)
        
        refreshControl.addTarget(self, action: #selector(refreshChatRooms), for: .valueChanged)
    }
    
    private func setupTableView() {
        tableView.delegate = self
        tableView.dataSource = self
        tableView.refreshControl = refreshControl
    }
    
    @objc private func createRoomButtonTapped() {
        let alert = UIAlertController(title: "Create Chat Room", message: nil, preferredStyle: .alert)
        
        alert.addTextField { textField in
            textField.placeholder = "Room Name"
        }
        
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel))
        alert.addAction(UIAlertAction(title: "Create", style: .default) { [weak self] _ in
            guard let roomName = alert.textFields?.first?.text, !roomName.isEmpty else { return }
            self?.createChatRoom(name: roomName)
        })
        
        present(alert, animated: true)
    }
    
    @objc private func logoutButtonTapped() {
        NetworkService.shared.setAuthToken(nil)
        SocketService.shared.disconnect()
        
        let loginVC = LoginViewController()
        navigationController?.setViewControllers([loginVC], animated: true)
    }
    
    @objc private func refreshChatRooms() {
        fetchChatRooms()
    }
    
    private func fetchChatRooms() {
        Task {
            do {
                let rooms = try await NetworkService.shared.getRooms()
                DispatchQueue.main.async { [weak self] in
                    self?.chatRooms = rooms
                    self?.tableView.reloadData()
                }
            } catch {
                DispatchQueue.main.async { [weak self] in
                    self?.showAlert(title: "Error", message: error.localizedDescription)
                }
            }
        }
    }
    
    private func createChatRoom(name: String) {
        Task {
            do {
                // TODO: Implement API call to create chat room
                // For now, just refresh the list
                fetchChatRooms()
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
    
    private func searchRooms(query: String) {
        Task {
            do {
                let results = try await NetworkService.shared.searchRooms(query: query)
                DispatchQueue.main.async { [weak self] in
                    self?.filteredRooms = results
                    self?.tableView.reloadData()
                }
            } catch {
                DispatchQueue.main.async { [weak self] in
                    self?.showAlert(title: "Error", message: error.localizedDescription)
                }
            }
        }
    }
}

extension ChatListViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return isSearching ? filteredRooms.count : chatRooms.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "ChatRoomCell", for: indexPath)
        let room = isSearching ? filteredRooms[indexPath.row] : chatRooms[indexPath.row]
        
        var content = cell.defaultContentConfiguration()
        content.text = room.name
        
        if let lastMessage = room.lastMessage {
            content.secondaryText = lastMessage
        }
        
        if let lastMessageTime = room.lastMessageTime {
            let formatter = DateFormatter()
            formatter.dateStyle = .none
            formatter.timeStyle = .short
            content.secondaryTextProperties.numberOfLines = 2
            content.secondaryText = "\(lastMessage)\n\(formatter.string(from: lastMessageTime))"
        }
        
        if room.unreadCount > 0 {
            content.secondaryTextProperties.color = .systemBlue
            cell.accessoryView = createUnreadBadge(count: room.unreadCount)
        } else {
            cell.accessoryView = nil
        }
        
        cell.contentConfiguration = content
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
        let room = isSearching ? filteredRooms[indexPath.row] : chatRooms[indexPath.row]
        let chatRoomVC = ChatRoomViewController(roomId: room.id, roomName: room.name)
        navigationController?.pushViewController(chatRoomVC, animated: true)
    }
    
    private func createUnreadBadge(count: Int) -> UIView {
        let badge = UILabel()
        badge.text = "\(count)"
        badge.textColor = .white
        badge.backgroundColor = .systemBlue
        badge.layer.cornerRadius = 10
        badge.layer.masksToBounds = true
        badge.textAlignment = .center
        badge.font = .systemFont(ofSize: 12, weight: .bold)
        badge.frame = CGRect(x: 0, y: 0, width: 20, height: 20)
        return badge
    }
}

extension ChatListViewController: UISearchResultsUpdating {
    func updateSearchResults(for searchController: UISearchController) {
        guard let query = searchController.searchBar.text, !query.isEmpty else {
            filteredRooms = []
            tableView.reloadData()
            return
        }
        
        searchRooms(query: query)
    }
}

extension ChatListViewController: UISearchControllerDelegate {
    func willPresentSearchController(_ searchController: UISearchController) {
        tableView.reloadData()
    }
    
    func willDismissSearchController(_ searchController: UISearchController) {
        filteredRooms = []
        tableView.reloadData()
    }
} 