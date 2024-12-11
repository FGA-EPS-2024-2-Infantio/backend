import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { AttendanceController } from './attendance.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [AttendanceController],
  providers: [],
})
export class AttendanceModule {}
