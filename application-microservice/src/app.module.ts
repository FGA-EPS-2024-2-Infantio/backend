import { Module } from '@nestjs/common';
import { ClassModule } from './classes/class.module';
import { SchoolsModule } from './schools/school.module';
import { StudentsModule } from './students/student.module';
import { TeachersModule } from './teachers/teacher.module';
import { MonthlyPaymentModule } from './monthlyPayment/monthlyPayment.module';
import { AttendanceModule } from './attendances/attendance.module';

@Module({
  imports: [
    StudentsModule,
    SchoolsModule,
    TeachersModule,
    ClassModule,
    AttendanceModule,
    MonthlyPaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
