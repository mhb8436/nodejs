import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "your-secret-key", // 실제 프로덕션에서는 환경 변수에서 가져와야 함
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
