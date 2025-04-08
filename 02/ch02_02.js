const path = require("path");
const fs = require("fs");

// 경로 결합
const fullPath = path.join(__dirname, "files", "test.txt");
console.log("전체 경로:", fullPath);

// 경로 분리
const pathParts = path.parse(fullPath);
console.log("경로 분리:", pathParts);

// 파일 확장자
const ext = path.extname("test.txt");
console.log("확장자:", ext);

// 상대 경로를 절대 경로로 변환
const absolutePath = path.resolve("test.txt");
console.log("절대 경로:", absolutePath);

// 경로 정규화
const normalizedPath = path.normalize("/foo/bar//baz/asdf/quux/..");
console.log("정규화된 경로:", normalizedPath);

// 상대 경로 계산
const relativePath = path.relative("/foo/bar", "/foo/bar/baz");
console.log("상대 경로:", relativePath);

// 디렉토리 관련 예제
console.log("\n=== 디렉토리 관련 예제 ===");

// 1. 디렉토리 생성
const dirPath = path.join(__dirname, "new-directory");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log("디렉토리 생성됨:", dirPath);
}

// 2. 디렉토리 존재 여부 확인
const dirExists = fs.existsSync(dirPath);
console.log("디렉토리 존재 여부:", dirExists);

// 3. 디렉토리 내용 읽기
const files = fs.readdirSync(__dirname);
console.log("현재 디렉토리의 파일들:", files);

// 4. 디렉토리 삭제
try {
  fs.rmdirSync(dirPath);
  console.log("디렉토리 삭제됨:", dirPath);
} catch (err) {
  console.error("디렉토리 삭제 실패:", err.message);
}

// 5. 재귀적 디렉토리 생성
const nestedDirPath = path.join(__dirname, "parent", "child", "grandchild");
fs.mkdirSync(nestedDirPath, { recursive: true });
console.log("중첩된 디렉토리 생성됨:", nestedDirPath);

// 6. 디렉토리 통계 정보
const stats = fs.statSync(__dirname);
console.log("디렉토리 정보:", {
  "생성 시간:": stats.birthtime,
  "수정 시간:": stats.mtime,
  "크기:": stats.size,
  "권한:": stats.mode.toString(8),
});

// 7. 디렉토리 이름 변경
const newDirPath = path.join(__dirname, "renamed-directory");
fs.renameSync(nestedDirPath, newDirPath);
console.log("디렉토리 이름 변경됨:", newDirPath);

// 8. 디렉토리 심볼릭 링크 생성
const symlinkPath = path.join(__dirname, "symlink-to-parent");
fs.symlinkSync("parent", symlinkPath, "dir");
console.log("심볼릭 링크 생성됨:", symlinkPath);

// 9. 디렉토리 권한 변경
fs.chmodSync(newDirPath, 0o755);
console.log("디렉토리 권한 변경됨");

// 10. 디렉토리 소유자 변경
try {
  fs.chownSync(newDirPath, process.getuid(), process.getgid());
  console.log("디렉토리 소유자 변경됨");
} catch (err) {
  console.error("소유자 변경 실패 (권한 필요):", err.message);
}
