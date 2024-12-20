import { Test } from '@nestjs/testing';
import { SchoolMicroserviceController } from '../school.controller';
import { SchoolsService } from '../school.service';
import { CreateSchoolDto } from '../dtos/CreateStudent.dto';


describe('SchoolController', () => {
  let schoolController: SchoolMicroserviceController;
  let mockSchoolsService: Partial<SchoolsService>;

  beforeEach(async () => {
    mockSchoolsService = {
      create: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test School',
        directorEmail: 'test@school.com',
        numberStudents: 300,
        userId: '123',
      }),
      findAll: jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'Test School',
          directorEmail: 'test@school.com',
          numberStudents: 300,
          userId: '123',
        },
      ]),
      get: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Test School',
        directorEmail: 'test@school.com',
        numberStudents: 300,
        userId: '123',
      }),
      update: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Updated School',
        directorEmail: 'updated@school.com',
        numberStudents: 400,
        userId: '123',
      }),
      disable: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Disabled School',
        directorEmail: 'disabled@school.com',
        numberStudents: 0,
        userId: '123',
        disabled: true,
      }),
    };

    const mockNatsService = {
      emit: jest.fn(),
      send: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [SchoolMicroserviceController],
      providers: [
        { provide: SchoolsService, useValue: mockSchoolsService },
        { provide: 'NATS_SERVICE', useValue: mockNatsService },
      ],
    }).compile();

    schoolController = module.get(SchoolMicroserviceController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('findAll', () => {
    it('Should return an array of schools', async () => {
      const result = await schoolController.getAllSchools();
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toHaveProperty('name', 'Test School');
    });
  });

  describe('get', () => {
    it('Should return a school by ID', async () => {
      const schoolId = '1';
      const result = await schoolController.get(schoolId);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('name', 'Test School');
    });
  });

  describe('create', () => {
    it('Should create a new school', async () => {
      const createSchoolDto: CreateSchoolDto = {
        name: 'New School',
        directorEmail: 'new@school.com',
        numberStudents: 300,
        userId: '123',
      };

      const result = await schoolController.createSchool(createSchoolDto);
      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('name', 'Test School');
    });
  });

  describe('update', () => {
    it('Should update an existing school', async () => {
      const schoolId = '1';
      const updateData: CreateSchoolDto = {
        name: 'Updated School',
        directorEmail: 'updated@school.com',
        numberStudents: 400,
        userId: '123',
      };

      const result = await schoolController.update({
        data: updateData,
        schoolId,
      });

      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('name', 'Updated School');
      expect(result).toHaveProperty('numberStudents', 400);
    });
  });

  describe('disable', () => {
    it('Should disable a school by ID', async () => {
      const schoolId = '1';
      const result = await schoolController.disable(schoolId);

      expect(result).toBeInstanceOf(Object);
      expect(result).toHaveProperty('disabled', true);
    });
  });
});
