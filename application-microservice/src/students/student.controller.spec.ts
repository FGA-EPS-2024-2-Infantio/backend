import { Test } from '@nestjs/testing';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { StudentMicroserviceController } from './student.controller';
import { StudentsService } from './student.service';

describe('StudentsController', () => {
  let studentsController: StudentMicroserviceController;
  let mockStudentsService: Partial<StudentsService>;

  beforeEach(async () => {
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
      findAll: jest.fn().mockResolvedValue([
        {
          id: '1',
          userId: '123',
          name: 'Student',
          categorie: 'PARCIAL',
          class: 'BERCARIO',
          turn: 'MATUTINO',
        },
      ]),
      get: jest.fn().mockResolvedValue({
        id: '1',
        userId: '123',
        name: 'Student',
        categorie: 'PARCIAL',
        class: 'BERCARIO',
        turn: 'MATUTINO',
      }),
      update: jest.fn().mockResolvedValue({
        message: 'Student updated successfully',
        data: {
          id: '1',
          userId: '123',
          name: 'Student',
          categorie: 'INTEGRAL',
          class: 'BERCARIO',
          turn: 'MATUTINO',
        },
      }),
      disable: jest.fn().mockResolvedValue({
        message: 'Student deleted successfully',
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
      controllers: [StudentMicroserviceController],
      providers: [
        { provide: StudentsService, useValue: mockStudentsService },
        { provide: 'NATS_SERVICE', useValue: mockNatsService },
      ],
    }).compile();

    studentsController = module.get(StudentMicroserviceController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAll', () => {
    it('Should return an array of students', async () => {
      const result = await studentsController.getAll({ userId: '123' });
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toHaveProperty('name', 'Student');
      expect(result[0]).toHaveProperty('userId', '123');
    });
  });

  describe('get', () => {
    it('Should return a student', async () => {
      const studentId = '1';
      const result = await studentsController.get(studentId);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('name', 'Student');
      expect(result).toHaveProperty('userId', '123');
    });
  });

  describe('create', () => {
    it('Should create a student', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'Student',
        categorie: 'PARCIAL',
        class: 'BERCARIO',
        turn: 'MATUTINO',
        userId: '123',
      };

      const { message, data } = await studentsController.create(createStudentDto);
      expect(message).toBe('Student created successfully');
      expect(data).toBeInstanceOf(Object);
      expect(data).toHaveProperty('name', 'Student');
      expect(data).toHaveProperty('userId', '123');
    });
  });

  describe('update', () => {
    it('Should update a student', async () => {
      const studentId = '1';
      const updateData: CreateStudentDto = {
        name: 'Student',
        categorie: 'INTEGRAL',
        class: 'BERCARIO',
        turn: 'MATUTINO',
        userId: '123',
      };

      const { message, data } = await studentsController.update({
        data: updateData,
        studentId,
      });
      expect(message).toBe('Student updated successfully');
      expect(data).toBeInstanceOf(Object);
      expect(data).toMatchObject(updateData);
    });
  });

  describe('disable', () => {
    it('Should disable a student', async () => {
      const studentId = '1';
      const { message } = await studentsController.disable(studentId);
      expect(message).toBe('Student deleted successfully');
    });
  });
});
