export class SchoolResponseDto {
  id: string;
  name: string;
  directorEmail: string;
  numberStudents: number;
  disabled: boolean;
  teachers?: {
    id: string;
    name: string;
  }[];
  students?: {
    id: string;
    name: string;
  }[];
  classes?: {
    id: string;
    name: string;
  }[];
}
