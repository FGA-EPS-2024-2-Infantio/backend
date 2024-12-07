import { Module } from '@nestjs/common';
import { ClassModule } from './classes/class.module';
import { SchoolsModule } from './schools/school.module';
import { StudentsModule } from './students/student.module';
import { TeachersModule } from './teachers/teacher.module';

@Module({
  imports: [StudentsModule, SchoolsModule, TeachersModule, ClassModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
