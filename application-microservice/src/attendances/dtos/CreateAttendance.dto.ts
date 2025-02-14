export class CreateAttendanceDto {
  studentId: string;
  classId: string;
  date: Date;
  hasAttended: boolean;
  entryTime?: Date;
  exitTime?: Date;
}
