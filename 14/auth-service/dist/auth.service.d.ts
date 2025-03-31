import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { User } from "./entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
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
    validateToken(token: string): Promise<{
        id: number;
        email: string;
        name: string;
    }>;
}
