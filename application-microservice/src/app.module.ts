import { Module } from '@nestjs/common';
import { AttendanceModule } from './attendances/attendance.module';
import { ClassModule } from './classes/class.module';
import { MonthlyPaymentModule } from './monthlyPayment/monthlyPayment.module';
import { SchoolsModule } from './schools/school.module';
import { StudentsModule } from './students/student.module';
import { TeachersModule } from './teachers/teacher.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    StudentsModule,
    SchoolsModule,
    TeachersModule,
    ClassModule,
    AttendanceModule,
    MonthlyPaymentModule,
    TicketModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
