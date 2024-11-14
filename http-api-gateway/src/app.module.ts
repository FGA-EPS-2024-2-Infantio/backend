import { Module } from '@nestjs/common';
import { NatsClientModule } from './nats-client/nats-client.module';
import { SchoolModule } from './schools/school.module';
import { StudentModule } from './students/student.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [NatsClientModule, UsersModule, StudentModule, SchoolModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
