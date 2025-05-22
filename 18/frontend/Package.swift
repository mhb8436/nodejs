// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "ChatApp",
    platforms: [
        .iOS(.v15)
    ],
    products: [
        .library(
            name: "ChatApp",
            targets: ["ChatApp"]),
    ],
    dependencies: [
        .package(url: "https://github.com/Alamofire/Alamofire.git", from: "5.7.0"),
        .package(url: "https://github.com/daltoniam/Starscream.git", from: "4.0.0")
    ],
    targets: [
        .target(
            name: "ChatApp",
            dependencies: ["Alamofire", "Starscream"]),
        .testTarget(
            name: "ChatAppTests",
            dependencies: ["ChatApp"]),
    ]
)
