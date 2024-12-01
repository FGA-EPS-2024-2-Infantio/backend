import { IsNotEmpty, IsNumber, IsString, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsString()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  classId: string;

  @IsNotEmpty()
  @IsBoolean()
  hasAttended: boolean;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;
}
