import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, nickname: user.nickname };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(data: { email: string; nickname: string; password: string }) {
    const exists = await this.usersService.findByEmail(data.email);
    if (exists) {
      throw new UnauthorizedException('이미 가입된 이메일입니다.');
    }
    const user = await this.usersService.create(data);
    return this.login(user);
  }
}

