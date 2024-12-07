import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { TeacherController } from './teacher.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [TeacherController],
  providers: [],
})
export class TeacherModule {}
