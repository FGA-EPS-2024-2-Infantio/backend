export class CreateMonthlyPaymentDto {
  studentId: string;
  month: number;
  year: number;
  payed: boolean;
  value: number;
}
