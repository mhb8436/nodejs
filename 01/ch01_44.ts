/**
 * TypeScript와 Node.js 학습
 *
 * 이 파일에서는 TypeScript와 Node.js의 통합을 학습합니다:
 * - Node.js 모듈 시스템
 * - 파일 시스템 작업
 * - HTTP 서버
 * - 환경 변수
 * - 타입 정의 파일
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      HOST?: string;
    }
  }
}

import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import * as dotenv from "dotenv";

// 1. 환경 변수 설정
const env = dotenv.config().parsed || {};

// 2. 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
}

interface Config {
  port: number;
  host: string;
}

// 3. 파일 시스템 작업
class FileHandler {
  static async readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  static async writeFile(filePath: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, "utf-8", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

// 4. HTTP 서버
class Server {
  private server: http.Server;
  private config: Config;

  constructor(config: Config) {
    this.config = config;
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  private handleRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ): void {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "안녕하세요!" }));
    } else if (req.url === "/users") {
      const users: User[] = [
        { id: 1, name: "홍길동", email: "hong@example.com" },
        { id: 2, name: "김철수", email: "kim@example.com" },
      ];
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "페이지를 찾을 수 없습니다." }));
    }
  }

  start(): void {
    this.server.listen(this.config.port, this.config.host, () => {
      console.log(
        `서버가 http://${this.config.host}:${this.config.port} 에서 실행 중입니다.`
      );
    });
  }
}

// 5. 비동기 작업 처리
async function processFiles(): Promise<void> {
  try {
    const data = await FileHandler.readFile(path.join(__dirname, "test.txt"));
    console.log("파일 내용:", data);

    await FileHandler.writeFile(
      path.join(__dirname, "output.txt"),
      "새로운 내용입니다."
    );
    console.log("파일이 성공적으로 작성되었습니다.");
  } catch (error) {
    console.error("파일 처리 중 오류 발생:", error);
  }
}

// 실행 예시
console.log("=== TypeScript와 Node.js 예제 ===");

// 환경 변수 사용
const config: Config = {
  port: parseInt(env.PORT || "3000", 10),
  host: env.HOST || "localhost",
};

// HTTP 서버 시작
const server = new Server(config);
server.start();

// 파일 시스템 작업 실행
processFiles();
