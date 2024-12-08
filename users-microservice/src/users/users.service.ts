import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { UsersPrismaService } from './users.prisma';

@Injectable()
export class UsersService {
  constructor(private readonly usersPrismaService: UsersPrismaService) {}

  async create(data: CreateUserDto) {
    return await this.usersPrismaService.create(data);
  }

  async getByEmail(email: string) {
    return await this.usersPrismaService.findByEmail(email);
  }

  async getById(id: string) {
    return await this.usersPrismaService.findById(id);
  }
}
