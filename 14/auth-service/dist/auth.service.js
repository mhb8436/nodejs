"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("이메일 또는 비밀번호가 잘못되었습니다.");
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("이메일 또는 비밀번호가 잘못되었습니다.");
        }
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException("이미 존재하는 이메일입니다.");
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = this.userRepository.create({
            ...registerDto,
            password: hashedPassword,
        });
        await this.userRepository.save(user);
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async validateToken(token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userRepository.findOne({
                where: { id: payload.sub },
            });
            if (!user) {
                throw new common_1.UnauthorizedException("유효하지 않은 토큰입니다.");
            }
            return {
                id: user.id,
                email: user.email,
                name: user.name,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException("유효하지 않은 토큰입니다.");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map