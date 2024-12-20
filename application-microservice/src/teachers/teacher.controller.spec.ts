import { Test } from '@nestjs/testing';
import { TeacherMicroserviceController } from './teacher.controller';
import { TeachersService } from './teacher.service';
import { PrismaService } from '../database/prisma.service';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';

describe('TeachersController', () => {
  let teachersController: TeacherMicroserviceController;
  let mockTeachersService: Partial<TeachersService>;
  let mockPrismaService: Partial<PrismaService>;
  let mockNatsService: Partial<any>;

  beforeEach(async () => {
    mockPrismaService = {
      teacher: {
        create: jest.fn().mockResolvedValue({
          id: '1',
          name: 'Matheus Soares',
          numberOfClasses: 5,
          userId: 'user123',
          cpf: '12345678902',
          startDate: new Date('2024-01-01'),
          schoolId: 'school123',
        }),
        findMany: jest.fn().mockResolvedValue([
          { id: '1', name: 'Matheus Soares', numberOfClasses: 5, cpf: '12345678901' },
        ]),
        findUnique: jest.fn().mockResolvedValue({
          id: '1',
          name: 'Matheus Soares',
          numberOfClasses: 5,
          cpf: '12345678901',
        }),
        update: jest.fn().mockResolvedValue({
          id: '1',
          name: 'Suetham seroas',
          numberOfClasses: 5,
          cpf: '12345678905',
        }),
        delete: jest.fn().mockResolvedValue({
          message: 'Teacher:1 successfully disabled',
        }),
      },
    } as unknown as Partial<PrismaService>;

    mockTeachersService = {
      findAll: jest.fn().mockResolvedValue([
        { id: '1', name: 'Matheus Soares', numberOfClasses: 5, cpf: '12345678901' },
      ]),
      get: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Matheus Soares',
        numberOfClasses: 5,
        cpf: '12345678901',
      }),
      create: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Matheus Soares',
        numberOfClasses: 5,
        cpf: '12345678902',
      }),
      update: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Suetham seroas',
        numberOfClasses: 5,
        cpf: '12345678905',
      }),
      disable: jest.fn().mockResolvedValue({
        message: 'Teacher:1 successfully disabled',
      }),
    };

    mockNatsService = {
      emit: jest.fn(),
      send: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [TeacherMicroserviceController],
      providers: [
        { provide: TeachersService, useValue: mockTeachersService },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: 'NATS_SERVICE', useValue: mockNatsService },
      ],
    }).compile();

    teachersController = module.get(TeacherMicroserviceController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAllTeachers', () => {
    it('Should return an array of teachers', async () => {
      const result = await teachersController.getAllTeachers({ userId: '1' });
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toHaveProperty('name', 'Matheus Soares');
    });
  });

  describe('get', () => {
    it('Should return a teacher', async () => {
      const result = await teachersController.get('1');
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('name', 'Matheus Soares');
    });
  });

  describe('createTeacher', () => {
    it('Should create a teacher', async () => {
      const createTeacher: CreateTeacherDto = {
        name: 'Matheus Soares',
        numberOfClasses: 5,
        cpf: '12345678902',
        startDate: new Date('2024-01-01'),
        schoolId: 'school123',
        userId: 'user123',
        directorId: 'director123',
      };
      const response = await teachersController.createTeacher(createTeacher);
      expect(response.success).toBe(true);
      expect(response.message).toBe('Teacher created successfully');
      expect(response.data).toHaveProperty('name', 'Matheus Soares');
    });
  });

  describe('update', () => {
    it('Should update a teacher', async () => {
      const updatedTeacher: CreateTeacherDto = {
        name: 'Suetham seroas',
        numberOfClasses: 5,
        cpf: '12345678905',
        startDate: new Date('2024-01-01'),
        schoolId: 'school123',
        userId: 'user123',
        directorId: 'director123',
      };

      const result = await teachersController.update({
        data: updatedTeacher,
        teacherId: '1',
      });

      expect(result).toHaveProperty('name', updatedTeacher.name);
      expect(result.numberOfClasses).toBe(updatedTeacher.numberOfClasses);
    });
  });

  describe('disable', () => {
    it('Should disable a teacher', async () => {
      const response = await teachersController.disable({ teacherId: '1' });
      expect(response.message).toBe('Teacher:1 successfully disabled');
    });
  });
});
