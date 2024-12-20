import { Test } from '@nestjs/testing';
import { CreateMonthlyPaymentDto } from './dtos/CreateMonthlyPayment.dto';
import { MonthlyPaymentMicroserviceController } from './monthlyPayment.controller';
import { MonthlyPaymentService } from './monthlyPayment.service';
import { StudentsService } from '../students/student.service';

describe('MonthlyPaymentController', () => {
  let controller: MonthlyPaymentMicroserviceController;
  let mockMonthlyPaymentService: Partial<MonthlyPaymentService>;
  let mockStudentsService: Partial<StudentsService>;
  let createPayment: CreateMonthlyPaymentDto;

  beforeEach(async () => {
    mockMonthlyPaymentService = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: '1',
          studentId: '1',
          month: 12,
          year: 2024,
          payed: true,
          value: 189,
        },
      ]),
      get: jest.fn().mockResolvedValue({
        id: '1',
        studentId: '1',
        month: 12,
        year: 2024,
        payed: true,
        value: 189,
      }),
      create: jest.fn().mockResolvedValue({
        id: '1',
        studentId: '1',
        month: 12,
        year: 2024,
        payed: true,
        value: 189,
      }),
      update: jest.fn().mockResolvedValue({
        id: '1',
        studentId: '1',
        month: 11,
        year: 2023,
        payed: false,
        value: 190,
      }),
      disable: jest.fn().mockResolvedValue({
        message: 'Payment deleted successfully',
      }),
    };

    mockStudentsService = {
      create: jest.fn().mockResolvedValue({
        message: 'Student created successfully',
        data: {
          id: '1',
          userId: '123',
          name: 'Student',
          categorie: 'PARCIAL',
          class: 'BERCARIO',
          turn: 'MATUTINO',
        },
      }),
    };

    const mockNatsService = {
      emit: jest.fn(),
      send: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [MonthlyPaymentMicroserviceController],
      providers: [
        { provide: MonthlyPaymentService, useValue: mockMonthlyPaymentService },
        { provide: StudentsService, useValue: mockStudentsService },
        { provide: 'NATS_SERVICE', useValue: mockNatsService },
      ],
    }).compile();

    controller = module.get(MonthlyPaymentMicroserviceController);

    createPayment = {
      studentId: '1',
      month: 12,
      year: 2024,
      payed: true,
      value: 189,
    };
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('Should return an array of payments', async () => {
      const result = await controller.getAll();
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toHaveProperty('month', 12);
      expect(result[0]).toHaveProperty('year', 2024);
    });
  });

  describe('get', () => {
    it('Should return monthly payment', async () => {
      const response = await controller.create(createPayment);
      const { id } = response.data;
      const result = await controller.get(id);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('month', 12);
      expect(result).toHaveProperty('year', 2024);
    });
  });

  describe('create', () => {
    it('Should create a payment', async () => {
      const response = await controller.create(createPayment);

      expect(response.message).toBe('Payment created successfully');
      expect(response.data).toBeInstanceOf(Object);
      expect(response.data.month).toBe(12);
    });
  });

  describe('update', () => {
    it('Should update a payment', async () => {
      const response = await controller.create(createPayment);
      const { id } = response.data;

      const updatedPayment: CreateMonthlyPaymentDto = {
        studentId: '1',
        month: 11,
        year: 2023,
        payed: false,
        value: 190,
      };

      const updateResponse = await controller.update({
        data: updatedPayment,
        monthlyPaymentId: id,
      });


      expect(updateResponse.message).toBe('Payment updated successfully');
      expect(updateResponse.data).toMatchObject(updatedPayment);
    });
  });

  describe('disable', () => {
    it('should disable a payment', async () => {
      const response = await controller.create(createPayment);
      const { id } = response.data;
      const disableResponse = await controller.disable(id);
      expect(disableResponse.message).toBe('Payment deleted successfully');
    });
  });
});
