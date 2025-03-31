// npm install uuid debug fs-extra
const { v1: uuidv1, v4: uuidv4, v5: uuidv5 } = require("uuid");
const crypto = require("crypto");
const debug = require("debug")("app:main");
const fs = require("fs-extra");
const path = require("path");

// 1. UUID 사용 사례
console.log("=== UUID 사용 사례 ===");
const userId = uuidv4();
const sessionId = uuidv1();
const namespaceId = uuidv5(
  "example.com",
  "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
);

console.log("사용자 ID:", userId);
console.log("세션 ID:", sessionId);
console.log("네임스페이스 ID:", namespaceId);

// 2. Crypto 사용 사례
console.log("\n=== Crypto 사용 사례 ===");
const userPassword = "mySecurePassword123";
const passwordSalt = crypto.randomBytes(16).toString("hex");
const passwordHash = crypto
  .pbkdf2Sync(userPassword, passwordSalt, 100000, 64, "sha512")
  .toString("hex");

console.log("비밀번호 해시:", passwordHash);
console.log("솔트:", passwordSalt);

// 3. Debug 사용 사례
console.log("\n=== Debug 사용 사례 ===");
debug("디버그 메시지입니다");
debug("사용자 정보: %O", { id: userId, name: "홍길동" });

// 4. fs-extra 사용 사례
console.log("\n=== fs-extra 사용 사례 ===");
const tempDir = path.join(__dirname, "temp");
const dataDir = path.join(__dirname, "data");

async function fsExtraExamples() {
  try {
    // 디렉토리 생성
    await fs.ensureDir(tempDir);
    await fs.ensureDir(dataDir);
    console.log("디렉토리 생성 완료");

    // 파일 복사
    const sourceFile = path.join(tempDir, "source.txt");
    const targetFile = path.join(dataDir, "target.txt");
    await fs.writeFile(sourceFile, "원본 파일 내용");
    await fs.copy(sourceFile, targetFile);
    console.log("파일 복사 완료");

    // JSON 파일 읽기/쓰기
    const jsonFile = path.join(dataDir, "config.json");
    const config = {
      appName: "MyApp",
      version: "1.0.0",
      settings: {
        debug: true,
        port: 3000,
      },
    };
    await fs.writeJson(jsonFile, config, { spaces: 2 });
    const readConfig = await fs.readJson(jsonFile);
    console.log("JSON 파일 읽기/쓰기 완료:", readConfig);

    // 파일 이동
    const moveSource = path.join(tempDir, "move.txt");
    const moveTarget = path.join(dataDir, "moved.txt");
    await fs.writeFile(moveSource, "이동할 파일 내용");
    await fs.move(moveSource, moveTarget);
    console.log("파일 이동 완료");

    // 디렉토리 내용 읽기
    const files = await fs.readdir(dataDir);
    console.log("디렉토리 내용:", files);

    // 파일 존재 여부 확인
    const exists = await fs.pathExists(jsonFile);
    console.log("파일 존재 여부:", exists);

    // 파일 삭제
    await fs.remove(targetFile);
    await fs.remove(moveTarget);
    console.log("파일 삭제 완료");

    // 디렉토리 삭제
    await fs.remove(tempDir);
    await fs.remove(dataDir);
    console.log("디렉토리 삭제 완료");
  } catch (error) {
    console.error("fs-extra 작업 중 오류 발생:", error);
  }
}

// fs-extra 예제 실행
fsExtraExamples();
