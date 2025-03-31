import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "auth_db",
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "your-secret-key", // 실제 프로덕션에서는 환경 변수에서 가져와야 함
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
