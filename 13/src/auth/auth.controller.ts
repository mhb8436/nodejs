import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "사용자 로그인" })
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password
    );
    if (!user) {
      throw new UnauthorizedException("이메일 또는 비밀번호가 잘못되었습니다.");
    }
    return this.authService.login(user);
  }
}
