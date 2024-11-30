export class ClassResponseDto {
  id: string;
  name: string;
  teacher: {
    id: string;
    name: string;
  };
  students: {
    id: string;
    name: string;
  }[];
  school?: {
    id: string;
    name: string;
  };
  disabled: boolean;
  disabledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
