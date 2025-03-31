import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ValidateTokenDto } from "./dto/validate-token.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    validateToken(validateTokenDto: ValidateTokenDto): Promise<{
        id: number;
        email: string;
        name: string;
    }>;
}
