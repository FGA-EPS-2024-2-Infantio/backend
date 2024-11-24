import { Module } from '@nestjs/common';
import { NatsClientModule } from './nats-client/nats-client.module';
import { SchoolModule } from './schools/school.module';
import { StudentModule } from './students/student.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [NatsClientModule, UsersModule, StudentModule, SchoolModule, AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
