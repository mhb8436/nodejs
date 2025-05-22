# ChatApp iOS (SwiftUI)

이 프로젝트는 NestJS 백엔드와 연동되는 SwiftUI 기반의 iOS 채팅/게시판 앱입니다.

## 주요 기능
- 회원가입/로그인 (JWT)
- 게시판(글/댓글 CRUD)
- 채팅방 목록/생성
- 실시간 채팅(WebSocket)

## 폴더 구조
```
frontend/
├── Models/
├── Services/
├── ViewModels/
├── Views/
├── ChatAppApp.swift
├── Info.plist
├── Package.swift
├── README.md
```

## 의존성
- Alamofire (REST API)
- Starscream (WebSocket)

## 실행 방법
1. Xcode에서 frontend 디렉토리 열기
2. Package.swift로 의존성 설치
3. 서버 주소(baseURL)는 APIService.swift에서 변경
4. 시뮬레이터 또는 디바이스에서 실행

---

각 파일별 상세 코드는 디렉토리별로 제공됩니다.
