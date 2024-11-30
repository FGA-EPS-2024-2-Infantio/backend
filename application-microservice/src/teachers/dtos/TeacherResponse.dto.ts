export class TeacherResponseDto {
  id: string;
  name: string;
  numberOfClasses: number;
  cpf: string;
  startDate: Date;
  school?: {
    id: string;
    name: string;
  };
  classes?: {
    id: string;
    name: string;
  }[];
}
