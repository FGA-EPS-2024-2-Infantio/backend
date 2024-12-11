import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isRpcContext = context.getType() === 'rpc';

    const request = context.switchToRpc().getData();
    const token = request.token;

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_TOKEN,
      });

      if (isRpcContext) {
        context.switchToRpc().getData().user = payload;
      } else {
        context.switchToHttp().getRequest().user = payload;
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
