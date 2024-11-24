import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('checkUser')
  async checkUser(@Payload() payload: { email: string }) {
    const isAuthorized = await this.authService.checkUserAuthorization(payload.email);
    return { isAuthorized };
  }
}