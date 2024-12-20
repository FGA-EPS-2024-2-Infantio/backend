import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsService } from '../school.service';
import { SchoolsPrismaService } from '../school.prisma';
import { CreateSchoolDto } from '../dtos/CreateStudent.dto';


describe('SchoolsService', () => {
    let service: SchoolsService;
    let mockPrismaService: Partial<SchoolsPrismaService>;

    beforeEach(async () => {
        mockPrismaService = {
            create: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Test School',
                directorEmail: 'director@test.com',
                numberStudents: 500,
                userId: 'user123',
            }),
            findAll: jest.fn().mockResolvedValue([
                {
                    id: '1',
                    name: 'Test School',
                    directorEmail: 'director@test.com',
                    numberStudents: 500,
                    userId: 'user123',
                },
            ]),
            get: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Test School',
                directorEmail: 'director@test.com',
                numberStudents: 500,
                userId: 'user123',
            }),
            disable: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Test School',
                directorEmail: 'director@test.com',
                numberStudents: 500,
                userId: 'user123',
            }),
            update: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Updated School',
                directorEmail: 'director@test.com',
                numberStudents: 600,
                userId: 'user123',
            }),
            findClassesBySchool: jest.fn().mockResolvedValue([
                { id: '1', name: 'Class 1', schoolId: '1' },
            ]),
            findStudentsBySchool: jest.fn().mockResolvedValue([
                { id: '1', name: 'Student 1', schoolId: '1' },
            ]),
            findTeachersBySchool: jest.fn().mockResolvedValue([
                { id: '1', name: 'Teacher 1', schoolId: '1' },
            ]),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SchoolsService,
                { provide: SchoolsPrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<SchoolsService>(SchoolsService);
    });

    afterEach(() => jest.clearAllMocks());

    it('should create a school', async () => {
        const createSchoolDto: CreateSchoolDto = {
            name: 'Test School',
            directorEmail: 'director@test.com',
            numberStudents: 500,
            userId: 'user123',
        };

        const result = await service.create(createSchoolDto);

        expect(mockPrismaService.create).toHaveBeenCalledWith(createSchoolDto);
        expect(result).toHaveProperty('name', 'Test School');
    });

    it('should return all schools', async () => {
        const result = await service.findAll();

        expect(mockPrismaService.findAll).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('name', 'Test School');
    });

    it('should return a school by ID', async () => {
        const result = await service.get('1');

        expect(mockPrismaService.get).toHaveBeenCalledWith('1');
        expect(result).toHaveProperty('name', 'Test School');
    });

    it('should disable a school by ID', async () => {
        const result = await service.disable('1');

        expect(mockPrismaService.disable).toHaveBeenCalledWith('1');
        expect(result).toHaveProperty('name', 'Test School');
    });

    it('should update a school', async () => {
        const updateData: CreateSchoolDto = {
            name: 'Updated School',
            directorEmail: 'director@test.com',
            numberStudents: 600,
            userId: 'user123',
        };

        const result = await service.update({ data: updateData, schoolId: '1' });

        expect(mockPrismaService.update).toHaveBeenCalledWith({
            data: updateData,
            schoolId: '1',
        });
        expect(result).toHaveProperty('name', 'Updated School');
    });

    it('should find classes by school', async () => {
        const result = await service.findClassesBySchool('1');

        expect(mockPrismaService.findClassesBySchool).toHaveBeenCalledWith('1');
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('name', 'Class 1');
    });

    it('should find students by school', async () => {
        const result = await service.findStudentsBySchool('1');

        expect(mockPrismaService.findStudentsBySchool).toHaveBeenCalledWith('1');
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('name', 'Student 1');
    });

    it('should find teachers by school', async () => {
        const result = await service.findTeachersBySchool('1');

        expect(mockPrismaService.findTeachersBySchool).toHaveBeenCalledWith('1');
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('name', 'Teacher 1');
    });
});