export class MonthlyPaymentResponseDto {
  id: string;
  studentId: string;
  month: number;
  year: number;
  value: number;
  payed: boolean;
}
