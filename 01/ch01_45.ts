/**
 * TypeScript 실전 프로젝트 예제
 *
 * 이 파일에서는 TypeScript를 사용한 실전 프로젝트 예제를 학습합니다:
 * - REST API 클라이언트
 * - 데이터베이스 연동
 * - 로깅 시스템
 * - 설정 관리
 * - 에러 처리
 */

// 1. 타입 정의
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

// 2. 로깅 시스템
class Logger {
  static info(message: string): void {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  static error(message: string, error?: Error): void {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    if (error) {
      console.error(error.stack);
    }
  }
}

// 3. 데이터베이스 연결
class Database {
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    try {
      Logger.info(
        `데이터베이스 연결 시도: ${this.config.host}:${this.config.port}`
      );
      // 실제 데이터베이스 연결 로직이 여기에 들어갑니다
      Logger.info("데이터베이스 연결 성공");
    } catch (error) {
      Logger.error("데이터베이스 연결 실패", error as Error);
      throw error;
    }
  }
}

// 4. API 클라이언트
class TodoApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTodos(): Promise<ApiResponse<Todo[]>> {
    try {
      Logger.info("할 일 목록 조회 중...");
      // 실제 API 호출 로직이 여기에 들어갑니다
      const response = {
        data: [
          {
            id: 1,
            title: "TypeScript 학습",
            completed: false,
            createdAt: new Date(),
          },
        ],
        status: 200,
        message: "성공",
      };
      return response;
    } catch (error) {
      Logger.error("할 일 목록 조회 실패", error as Error);
      throw error;
    }
  }

  async createTodo(
    todo: Omit<Todo, "id" | "createdAt">
  ): Promise<ApiResponse<Todo>> {
    try {
      Logger.info("새로운 할 일 생성 중...");
      // 실제 API 호출 로직이 여기에 들어갑니다
      const response = {
        data: {
          id: 1,
          ...todo,
          createdAt: new Date(),
        },
        status: 201,
        message: "생성됨",
      };
      return response;
    } catch (error) {
      Logger.error("할 일 생성 실패", error as Error);
      throw error;
    }
  }
}

// 5. 설정 관리
class Config {
  private static instance: Config;
  private settings: Record<string, any>;

  private constructor() {
    this.settings = {
      api: {
        baseUrl: "https://api.example.com",
        timeout: 5000,
      },
      database: {
        host: "localhost",
        port: 5432,
        username: "user",
        password: "password",
        database: "todos",
      },
    };
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  get<T>(key: string): T {
    return this.settings[key] as T;
  }
}

// 6. 메인 애플리케이션
class TodoApp {
  private api: TodoApi;
  private database: Database;
  private config: Config;

  constructor() {
    this.config = Config.getInstance();
    this.api = new TodoApi(this.config.get<{ baseUrl: string }>("api").baseUrl);
    this.database = new Database(this.config.get<DatabaseConfig>("database"));
  }

  async initialize(): Promise<void> {
    try {
      await this.database.connect();
      Logger.info("애플리케이션 초기화 완료");
    } catch (error) {
      Logger.error("애플리케이션 초기화 실패", error as Error);
      throw error;
    }
  }

  async run(): Promise<void> {
    try {
      const todos = await this.api.getTodos();
      Logger.info(`할 일 목록: ${JSON.stringify(todos.data)}`);

      const newTodo = await this.api.createTodo({
        title: "새로운 할 일",
        completed: false,
      });
      Logger.info(`새로운 할 일 생성됨: ${JSON.stringify(newTodo.data)}`);
    } catch (error) {
      Logger.error("애플리케이션 실행 중 오류 발생", error as Error);
    }
  }
}

// 실행 예시
console.log("=== TypeScript 실전 프로젝트 예제 ===");

const app = new TodoApp();
app
  .initialize()
  .then(() => app.run())
  .catch((error) => Logger.error("애플리케이션 종료", error as Error));
