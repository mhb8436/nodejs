import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("인증 토큰이 필요합니다.");
    }

    try {
      const user = await firstValueFrom(
        this.authClient.send({ cmd: "validate_token" }, { token })
      );
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException("유효하지 않은 토큰입니다.");
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
