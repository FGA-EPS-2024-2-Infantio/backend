import { Test } from '@nestjs/testing';
import { TeacherMicroserviceController } from './teacher.controller';
import { TeachersModule } from './teacher.module';
import { CreateTeacherDto } from './dtos/CreateTeacher.dto';

describe('TeachersController', () => {
  let teachersController: TeacherMicroserviceController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TeachersModule],
    }).compile();

    teachersController = module.get(TeacherMicroserviceController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAllTeachers', () => {
    it('Should return an array of teachers', async () => {
      expect(await teachersController.getAllTeachers()).toBeInstanceOf(Array<object>);
    });
  });

  describe('get', () => {
    it('Should return a teacher', async () => {
      const response = await teachersController.createTeacher({
        name: 'John Doe',
        numberOfClasses: 5,
        cpf: '12345678900',
        startDate: new Date('2024-01-01'),
      });
      const teacherId = response.data.id;

      expect(await teachersController.get(teacherId)).toBeInstanceOf(Object);
    });
  });

  describe('createTeacher', () => {
    it('Should create a teacher', async () => {
      const createTeacher: CreateTeacherDto = {
        name: 'Matheus Soares',
        numberOfClasses: 5,
        cpf: '12345678901',
        startDate:  new Date('2024-01-01'),
      };

      const { message, data } = await teachersController.createTeacher(createTeacher);
      expect(message).toBe('Teacher created successfully');
      expect(data).toBeInstanceOf(Object);
    });

    it('Should handle CPF unique constraint error', async () => {
      const createTeacher: CreateTeacherDto = {
        name: 'John Doe',
        numberOfClasses: 5,
        cpf: '12345678900',
        startDate: new Date('2024-01-01'),
      };

      await teachersController.createTeacher(createTeacher);
      
      const response = await teachersController.createTeacher(createTeacher);

      expect(response.success).toBe(false);
      expect(response.error).toBe('CPF already exists');
      expect(response.code).toBe('UNIQUE_CONSTRAINT');
    });
  });

  describe('update', () => {
    it('Should update a teacher', async () => {
      const response = await teachersController.createTeacher({
        name: 'John Doe',
        numberOfClasses: 5,
        cpf: '12345678904',
        startDate: new Date('2024-01-01'),
      });

      const teacherId = response.data.id;

      const updatedTeacher: CreateTeacherDto = {
        name: 'John Doe Updated',
        numberOfClasses: 6,
        cpf: '12345678904',
        startDate: new Date('2024-01-01'),
      };

      const result = await teachersController.update({
        data: updatedTeacher,
        teacherId,
      });

      expect(result.name).toBe(updatedTeacher.name);
      expect(result.numberOfClasses).toBe(updatedTeacher.numberOfClasses);
    });
  });

  describe('disable', () => {
    it('should disable a teacher', async () => {
      const response = await teachersController.createTeacher({
        name: 'John Doe',
        numberOfClasses: 5,
        cpf: '12345678910',
        startDate: new Date('2024-01-01'),
      });

      const teacherId = response.data.id;

      const { message } = await teachersController.disable(teacherId);

      expect(message).toBe(`Successfully Teacher:${teacherId} deleted`);
    });
  });
});