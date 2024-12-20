import { Test, TestingModule } from '@nestjs/testing';
import { TeachersPrismaService } from '../teacher.prisma';
import { TeachersService } from '../teacher.service';
import { CreateTeacherDto } from '../dtos/CreateTeacher.dto';


describe('TeachersService', () => {
    let service: TeachersService;
    let mockPrismaService: Partial<TeachersPrismaService>;

    beforeEach(async () => {
        mockPrismaService = {
            createTeacher: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Teacher Name',
                numberOfClasses: 5,
                userId: 'user123',
                cpf: '12345678901',
                startDate: new Date('2024-01-01'),
            }),
            findAllTeachers: jest.fn().mockResolvedValue([
                {
                    id: '1',
                    name: 'Teacher Name',
                    numberOfClasses: 5,
                    userId: 'user123',
                    cpf: '12345678901',
                    startDate: new Date('2024-01-01'),
                },
            ]),
            get: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Teacher Name',
                numberOfClasses: 5,
                userId: 'user123',
                cpf: '12345678901',
                startDate: new Date('2024-01-01'),
            }),
            disable: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Updated Teacher Name',
                numberOfClasses: 6,
                userId: 'user123',
                cpf: '12345678902',
                startDate: new Date('2024-01-01'),
            }),
            findClassesByTeacher: jest.fn().mockResolvedValue([
                { id: 'class1', name: 'Class 1', teacherId: '1' },
            ]),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TeachersService,
                { provide: TeachersPrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<TeachersService>(TeachersService);
    });

    afterEach(() => jest.clearAllMocks());

    it('should create a teacher', async () => {
        const createTeacherDto: CreateTeacherDto = {
            name: 'Teacher Name',
            numberOfClasses: 5,
            cpf: '12345678901',
            startDate: new Date('2024-01-01'),
            userId: 'user123',
            directorId: 'director123',
            schoolId: 'school123',
        };

        const result = await service.create(createTeacherDto);

        expect(mockPrismaService.createTeacher).toHaveBeenCalledWith(
            createTeacherDto,
        );
        expect(result).toHaveProperty('name', 'Teacher Name');
    });

    it('should return all teachers', async () => {
        const result = await service.findAll({ userId: 'user123' });

        expect(mockPrismaService.findAllTeachers).toHaveBeenCalledWith({
            userId: 'user123',
        });
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('name', 'Teacher Name');
    });

    it('should return a teacher by ID', async () => {
        const result = await service.get('1');

        expect(mockPrismaService.get).toHaveBeenCalledWith('1');
        expect(result).toHaveProperty('name', 'Teacher Name');
    });

    it('should disable a teacher', async () => {
        const result = await service.disable({ teacherId: '1' });

        expect(mockPrismaService.disable).toHaveBeenCalledWith({ teacherId: '1' });
        expect(result).toBeUndefined();
    });

    it('should update a teacher', async () => {
        const updateData: CreateTeacherDto = {
            name: 'Updated Teacher Name',
            numberOfClasses: 6,
            cpf: '12345678902',
            startDate: new Date('2024-01-01'),
            userId: 'user123',
            directorId: 'director123',
            schoolId: 'school123',
        };

        const result = await service.update({ data: updateData, teacherId: '1' });

        expect(mockPrismaService.update).toHaveBeenCalledWith({
            data: updateData,
            teacherId: '1',
        });
        expect(result).toHaveProperty('name', 'Updated Teacher Name');
    });

    it('should return classes by teacher', async () => {
        const result = await service.findClassesByTeacher('1');

        expect(mockPrismaService.findClassesByTeacher).toHaveBeenCalledWith('1');
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('name', 'Class 1');
    });
});
