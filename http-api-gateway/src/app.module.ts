import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './classes/class.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { SchoolModule } from './schools/school.module';
import { StudentModule } from './students/student.module';
import { TeacherModule } from './teachers/teacher.module';
import { UsersModule } from './users/users.module';
import { MonthlyPaymentModule } from './monthlyPayment/monthlyPayment.module';
import { AttendanceModule } from './attendances/attendance.module';

@Module({
  imports: [NatsClientModule, StudentModule, SchoolModule, TeacherModule, ClassModule, AuthModule, UsersModule, AttendanceModule, MonthlyPaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
