import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/database/prisma.module';
import { UsersMicroserviceController } from './users.controller';
import { UsersPrismaService } from './users.prisma';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersMicroserviceController],
  providers: [UsersService, UsersPrismaService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
