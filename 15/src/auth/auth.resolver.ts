import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
    }
    const { access_token } = await this.authService.login(user);
    return access_token;
  }

  @Mutation(() => String)
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('name') name: string,
  ) {
    const user = await this.authService.register(email, password, name);
    const { access_token } = await this.authService.login(user);
    return access_token;
  }
} 