import { Module } from '@nestjs/common';
import { PrismaModule } from '../database/prisma.module';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { TeacherMicroserviceController } from './teacher.controller';
import { TeachersPrismaService } from './teacher.prisma';
import { TeachersService } from './teacher.service';

@Module({
  imports: [NatsClientModule, PrismaModule],
  controllers: [TeacherMicroserviceController],
  providers: [TeachersPrismaService, TeachersService],
})
export class TeachersModule {}
