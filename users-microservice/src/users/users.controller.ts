import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UsersService } from 'src/users/users.service';

@Controller()
export class UsersMicroserviceController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('getUserProfile')
  @UseGuards(JwtGuard)
  async getUserProfile(@Payload() data: { userId: string; user: any }) {
    const user1 = await this.usersService.getById(data.userId);
    return user1;
  }
}
