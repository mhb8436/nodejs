import UIKit
import UserNotifications

class NotificationService: NSObject {
    static let shared = NotificationService()
    
    private override init() {
        super.init()
        UNUserNotificationCenter.current().delegate = self
    }
    
    func requestAuthorization() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if granted {
                DispatchQueue.main.async {
                    UIApplication.shared.registerForRemoteNotifications()
                }
            }
            
            if let error = error {
                print("Error requesting notification authorization: \(error.localizedDescription)")
            }
        }
    }
    
    func handleNotification(_ userInfo: [AnyHashable: Any]) {
        guard let payload = try? JSONDecoder().decode(PushNotificationPayload.self, from: JSONSerialization.data(withJSONObject: userInfo)) else {
            return
        }
        
        // Handle notification based on type
        switch payload.type {
        case "message":
            handleMessageNotification(payload)
        case "mention":
            handleMentionNotification(payload)
        case "room_invite":
            handleRoomInviteNotification(payload)
        default:
            break
        }
    }
    
    private func handleMessageNotification(_ payload: PushNotificationPayload) {
        // Navigate to chat room if app is in foreground
        if UIApplication.shared.applicationState == .active {
            NotificationCenter.default.post(
                name: NSNotification.Name("NavigateToChatRoom"),
                object: nil,
                userInfo: ["roomId": payload.roomId, "messageId": payload.messageId]
            )
        }
    }
    
    private func handleMentionNotification(_ payload: PushNotificationPayload) {
        // Handle mention notification
        if UIApplication.shared.applicationState == .active {
            NotificationCenter.default.post(
                name: NSNotification.Name("NavigateToChatRoom"),
                object: nil,
                userInfo: ["roomId": payload.roomId, "messageId": payload.messageId]
            )
        }
    }
    
    private func handleRoomInviteNotification(_ payload: PushNotificationPayload) {
        // Handle room invite notification
        if UIApplication.shared.applicationState == .active {
            NotificationCenter.default.post(
                name: NSNotification.Name("ShowRoomInvite"),
                object: nil,
                userInfo: ["roomId": payload.roomId]
            )
        }
    }
}

extension NotificationService: UNUserNotificationCenterDelegate {
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                              willPresent notification: UNNotification,
                              withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        // Show notification even when app is in foreground
        completionHandler([.banner, .sound])
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                              didReceive response: UNNotificationResponse,
                              withCompletionHandler completionHandler: @escaping () -> Void) {
        let userInfo = response.notification.request.content.userInfo
        handleNotification(userInfo)
        completionHandler()
    }
} 