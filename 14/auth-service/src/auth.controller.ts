import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ValidateTokenDto } from "./dto/validate-token.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern("login")
  async login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @MessagePattern("register")
  async register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern("validate_token")
  async validateToken(@Payload() validateTokenDto: ValidateTokenDto) {
    return this.authService.validateToken(validateTokenDto.token);
  }
}
