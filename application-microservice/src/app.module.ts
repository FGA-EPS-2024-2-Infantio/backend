import { Module } from '@nestjs/common';
import { StudentsModule } from './students/student.module';

@Module({
  imports: [StudentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
