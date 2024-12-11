import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendances/attendance.module';
import { AuthModule } from './auth/auth.module';
import { ClassModule } from './classes/class.module';
import { MonthlyPaymentModule } from './monthlyPayment/monthlyPayment.module';
import { NatsClientModule } from './nats-client/nats-client.module';
import { SchoolModule } from './schools/school.module';
import { StudentModule } from './students/student.module';
import { TeacherModule } from './teachers/teacher.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    NatsClientModule,
    StudentModule,
    SchoolModule,
    TeacherModule,
    ClassModule,
    AuthModule,
    UserModule,
    AttendanceModule,
    MonthlyPaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
