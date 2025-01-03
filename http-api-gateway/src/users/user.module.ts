import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { UserController } from './user.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
