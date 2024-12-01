import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/database/prisma.module';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { AttendanceMicroserviceController } from './attendance.controller';
import { AttendancePrismaService } from './attendance.prisma';
import { AttendanceService } from './attendance.service';

@Module({
  imports: [NatsClientModule, PrismaModule],
  controllers: [AttendanceMicroserviceController],
  providers: [AttendancePrismaService, AttendanceService],
})
export class AttendanceModule {}
