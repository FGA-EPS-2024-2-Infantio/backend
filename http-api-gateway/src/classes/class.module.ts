import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { ClassController } from './class.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [ClassController],
  providers: [],
})
export class ClassModule {}
