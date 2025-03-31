import { Controller, Post, Body, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";

@ApiTags("인증")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authClient: ClientProxy
  ) {}

  @Post("login")
  @ApiOperation({ summary: "로그인" })
  @ApiResponse({ status: 200, description: "로그인 성공" })
  @ApiResponse({ status: 401, description: "인증 실패" })
  async login(@Body() loginDto: LoginDto) {
    return firstValueFrom(this.authClient.send({ cmd: "login" }, loginDto));
  }

  @Post("register")
  @ApiOperation({ summary: "회원가입" })
  @ApiResponse({ status: 201, description: "회원가입 성공" })
  @ApiResponse({ status: 400, description: "잘못된 요청" })
  async register(@Body() registerDto: RegisterDto) {
    return firstValueFrom(
      this.authClient.send({ cmd: "register" }, registerDto)
    );
  }
}
