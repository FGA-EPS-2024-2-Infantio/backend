import { Module } from '@nestjs/common';
import { ClassModule } from './classes/class.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { SchoolModule } from './schools/school.module';
import { StudentModule } from './students/student.module';
import { TeacherModule } from './teachers/teacher.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NatsClientModule, UsersModule, StudentModule, SchoolModule, TeacherModule, ClassModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
