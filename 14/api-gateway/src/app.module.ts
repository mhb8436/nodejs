import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";
import { PostController } from "./controllers/post.controller";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

@Module({
  imports: [
    // 마이크로서비스 클라이언트 등록
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3001,
        },
      },
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3002,
        },
      },
      {
        name: "POST_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "localhost",
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [AuthController, UserController, PostController],
  providers: [JwtAuthGuard],
})
export class AppModule {}
