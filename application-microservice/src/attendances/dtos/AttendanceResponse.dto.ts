import { Student } from "@prisma/client";

export class AttendanceResponseDto {
    studentId: string;
    student?: Student;
    classId: string;
    date: Date;
    hasAttended: boolean;
}