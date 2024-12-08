import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/auth.login';
import { CreateUserDto } from './dtos/user.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller()
export class AuthMicroserviceController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @MessagePattern('registerUser')
  async registerUser(@Payload() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @MessagePattern('login')
  async login(@Payload() dto: LoginDTO) {
    try {
      return await this.authService.login(dto);
    } catch {
      return {
        success: false,
        error: 'Unathorized',
        code: 401,
      };
    }
  }

  @MessagePattern('refreshToken')
  @UseGuards(RefreshJwtGuard)
  async refreshToken(@Payload() data: { user: any }) {
    try {
      return await this.authService.refreshToken(data.user);
    } catch {
      return {
        success: false,
        error: 'Unathorized',
        code: 401,
      };
    }
  }
}
