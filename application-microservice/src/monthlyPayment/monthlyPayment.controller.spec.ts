import { Test } from '@nestjs/testing';
import { CreateMonthlyPaymentDto } from './dtos/CreateMonthlyPayment.dto';
import { MonthlyPaymentMicroserviceController } from './monthlyPayment.controller';
import { MonthlyPaymentModule } from './monthlyPayment.module';
import { CreateStudentDto } from '../students/dtos/CreateStudent.dto';
import { StudentMicroserviceController } from '../students/student.controller';
import { StudentsModule } from '../students/student.module';

describe('MonthlyPaymentController', () => {
  let controller: MonthlyPaymentMicroserviceController;
  let student;
  let createPayment: CreateMonthlyPaymentDto;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [MonthlyPaymentModule, StudentsModule],
    }).compile();

    controller = module.get(MonthlyPaymentMicroserviceController);

    const studentsController = module.get(StudentMicroserviceController);

    const createStudent: CreateStudentDto = {
      name: 'Student',
      categorie: 'PARCIAL',
      class: 'BERCARIO',
      turn: 'MATUTINO',
    };

    const response = await studentsController.create(createStudent);

    student = response.data;

    createPayment = {
      studentId: student.id,
      month: 12,
      year: 2024,
      payed: true,
      value: 189,
    };
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('Should return an array of payments', async () => {
      expect(await controller.getAll()).toBeInstanceOf(Array<object>);
    });
  });

  describe('get', () => {
    it('Should return monthly payment', async () => {
      const response = await controller.create(createPayment);

      const { id } = response.data;

      expect(await controller.get(id)).toBeInstanceOf(Object);
    });
  });

  describe('create', () => {
    it('Should create a payment', async () => {
      const { message, data } = await controller.create(createPayment);

      expect(message).toBe('Payment created successfully');
      expect(data).toBeInstanceOf(Object);
    });
  });

  describe('update', () => {
    it('Should update a payment', async () => {
      const response = await controller.create(createPayment);

      const { id } = response.data;

      const updatedPayment: CreateMonthlyPaymentDto = {
        studentId: student.id,
        month: 11,
        year: 2023,
        payed: false,
        value: 190,
      };

      const { message, data } = await controller.update({
        data: updatedPayment,
        monthlyPaymentId: id,
      });

      expect(message).toBe('Payment updated successfully');
      expect(data).toMatchObject(updatedPayment);
    });
  });

  describe('disable', () => {
    it('should disable a payment', async () => {
      const response = await controller.create(createPayment);

      const { id } = response.data;

      const { message } = await controller.disable(id);

      expect(message).toBe('Payment deleted successfully');
    });
  });
});
