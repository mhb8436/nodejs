import UIKit

class MessageCell: UITableViewCell {
    static let reuseIdentifier = "MessageCell"
    
    private let messageBubbleView: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 12
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    private let messageLabel: UILabel = {
        let label = UILabel()
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let senderLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 12, weight: .medium)
        label.textColor = .gray
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let timeLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 10)
        label.textColor = .gray
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let messageImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFit
        imageView.layer.cornerRadius = 8
        imageView.clipsToBounds = true
        imageView.translatesAutoresizingMaskIntoConstraints = false
        return imageView
    }()
    
    private let fileButton: UIButton = {
        let button = UIButton(type: .system)
        button.setImage(UIImage(systemName: "doc.fill"), for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let readStatusLabel: UILabel = {
        let label = UILabel()
        label.font = .systemFont(ofSize: 10)
        label.textColor = .gray
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private var message: ChatMessage?
    private var isCurrentUser: Bool = false
    private var readByUsers: Set<String> = []
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupViews()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupViews() {
        selectionStyle = .none
        backgroundColor = .clear
        
        contentView.addSubview(messageBubbleView)
        messageBubbleView.addSubview(messageLabel)
        messageBubbleView.addSubview(senderLabel)
        messageBubbleView.addSubview(timeLabel)
        messageBubbleView.addSubview(messageImageView)
        messageBubbleView.addSubview(fileButton)
        messageBubbleView.addSubview(readStatusLabel)
        
        NSLayoutConstraint.activate([
            messageBubbleView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 4),
            messageBubbleView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor, constant: -4),
            messageBubbleView.widthAnchor.constraint(lessThanOrEqualTo: contentView.widthAnchor, multiplier: 0.75),
            
            senderLabel.topAnchor.constraint(equalTo: messageBubbleView.topAnchor, constant: 4),
            senderLabel.leadingAnchor.constraint(equalTo: messageBubbleView.leadingAnchor, constant: 8),
            senderLabel.trailingAnchor.constraint(equalTo: messageBubbleView.trailingAnchor, constant: -8),
            
            messageLabel.topAnchor.constraint(equalTo: senderLabel.bottomAnchor, constant: 4),
            messageLabel.leadingAnchor.constraint(equalTo: messageBubbleView.leadingAnchor, constant: 8),
            messageLabel.trailingAnchor.constraint(equalTo: messageBubbleView.trailingAnchor, constant: -8),
            
            messageImageView.topAnchor.constraint(equalTo: messageLabel.bottomAnchor, constant: 4),
            messageImageView.leadingAnchor.constraint(equalTo: messageBubbleView.leadingAnchor, constant: 8),
            messageImageView.trailingAnchor.constraint(equalTo: messageBubbleView.trailingAnchor, constant: -8),
            messageImageView.heightAnchor.constraint(lessThanOrEqualToConstant: 200),
            
            fileButton.topAnchor.constraint(equalTo: messageLabel.bottomAnchor, constant: 4),
            fileButton.leadingAnchor.constraint(equalTo: messageBubbleView.leadingAnchor, constant: 8),
            fileButton.bottomAnchor.constraint(equalTo: timeLabel.topAnchor, constant: -4),
            
            timeLabel.leadingAnchor.constraint(equalTo: messageBubbleView.leadingAnchor, constant: 8),
            timeLabel.trailingAnchor.constraint(equalTo: messageBubbleView.trailingAnchor, constant: -8),
            timeLabel.bottomAnchor.constraint(equalTo: messageBubbleView.bottomAnchor, constant: -4),
            
            readStatusLabel.trailingAnchor.constraint(equalTo: messageBubbleView.trailingAnchor, constant: -8),
            readStatusLabel.bottomAnchor.constraint(equalTo: messageBubbleView.bottomAnchor, constant: -4),
            readStatusLabel.leadingAnchor.constraint(greaterThanOrEqualTo: messageBubbleView.leadingAnchor, constant: 8)
        ])
    }
    
    func configure(with message: ChatMessage, isCurrentUser: Bool, readByUsers: Set<String>) {
        self.message = message
        self.isCurrentUser = isCurrentUser
        self.readByUsers = readByUsers
        
        messageLabel.text = message.content
        senderLabel.text = message.senderName
        timeLabel.text = formatDate(message.createdAt)
        
        // Configure bubble appearance
        messageBubbleView.backgroundColor = isCurrentUser ? .systemBlue : .systemGray5
        messageLabel.textColor = isCurrentUser ? .white : .black
        
        // Update constraints based on message type
        switch message.type {
        case .text:
            messageImageView.isHidden = true
            fileButton.isHidden = true
            messageLabel.isHidden = false
            
        case .image:
            messageImageView.isHidden = false
            fileButton.isHidden = true
            messageLabel.isHidden = true
            if let url = URL(string: message.content) {
                loadImage(from: url)
            }
            
        case .file:
            messageImageView.isHidden = true
            fileButton.isHidden = false
            messageLabel.isHidden = false
            messageLabel.text = message.fileName ?? "File"
        }
        
        // Update bubble position
        if isCurrentUser {
            messageBubbleView.leadingAnchor.constraint(greaterThanOrEqualTo: contentView.leadingAnchor, constant: 60).isActive = true
            messageBubbleView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor, constant: -8).isActive = true
        } else {
            messageBubbleView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 8).isActive = true
            messageBubbleView.trailingAnchor.constraint(lessThanOrEqualTo: contentView.trailingAnchor, constant: -60).isActive = true
        }
        
        updateReadStatus()
    }
    
    private func loadImage(from url: URL) {
        URLSession.shared.dataTask(with: url) { [weak self] data, _, _ in
            if let data = data, let image = UIImage(data: data) {
                DispatchQueue.main.async {
                    self?.messageImageView.image = image
                }
            }
        }.resume()
    }
    
    private func formatDate(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.dateStyle = .none
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
    
    private func updateReadStatus() {
        if readByUsers.isEmpty {
            readStatusLabel.text = "Sent"
        } else if readByUsers.count == 1 {
            readStatusLabel.text = "Read by \(readByUsers.first!)"
        } else {
            readStatusLabel.text = "Read by \(readByUsers.count) people"
        }
    }
} 