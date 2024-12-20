import { Test, TestingModule } from '@nestjs/testing';
import { StudentsPrismaService } from '../student.prisma';
import { StudentsService } from '../student.service';
import { CreateStudentDto } from '../dtos/CreateStudent.dto';

describe('StudentsService', () => {
    let service: StudentsService;
    let mockPrismaService: Partial<StudentsPrismaService>;

    beforeEach(async () => {
        mockPrismaService = {
            create: jest.fn().mockResolvedValue({
                id: '1',
                userId: '123',
                name: 'Student',
                categorie: 'PARCIAL',
                class: 'BERCARIO',
                turn: 'MATUTINO',
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

                id: '1',
                userId: '123',
                name: 'Student',
                categorie: 'INTEGRAL',
                class: 'BERCARIO',
                turn: 'MATUTINO',
            }),
            disable: jest.fn().mockResolvedValue({
                id: '1',
                userId: '123',
                name: 'Student',
                categorie: 'PARCIAL',
                class: 'BERCARIO',
                turn: 'MATUTINO',
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StudentsService,
                { provide: StudentsPrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<StudentsService>(StudentsService);
    });

    afterEach(() => jest.clearAllMocks());

    it('should create a student', async () => {
        const createStudentDto: CreateStudentDto = {
            name: 'Student',
            class: 'BERCARIO',
            turn: 'MATUTINO',
            categorie: 'PARCIAL',
            userId: '123',
        };

        const result = await service.create(createStudentDto);

        expect(mockPrismaService.create).toHaveBeenCalledWith(createStudentDto);
        expect(result.message).toBe('Student created successfully');
        expect(result.data).toHaveProperty('name', 'Student');
        expect(result.data).toHaveProperty('categorie', 'PARCIAL');
    });

    it('should return all students', async () => {
        const result = await service.findAll({ userId: '123' });

        expect(mockPrismaService.findAll).toHaveBeenCalledWith({ userId: '123' });
        expect(result).toBeInstanceOf(Array);
        expect(result[0]).toHaveProperty('name', 'Student');
        expect(result[0]).toHaveProperty('categorie', 'PARCIAL');
    });

    it('should return a student by ID', async () => {
        const result = await service.get('1');

        expect(mockPrismaService.get).toHaveBeenCalledWith('1');
        expect(result).toHaveProperty('name', 'Student');
        expect(result).toHaveProperty('categorie', 'PARCIAL');
    });

    it('should update a student', async () => {
        const updateData: CreateStudentDto = {
            name: 'Student',
            class: 'BERCARIO',
            turn: 'MATUTINO',
            categorie: 'INTEGRAL',
            userId: '123',
        };

        const result = await service.update({ data: updateData, studentId: '1' });

        expect(mockPrismaService.update).toHaveBeenCalledWith({
            data: updateData,
            studentId: '1',
        });
        expect(result.message).toBe('Student updated successfully');
        expect(result.data).toHaveProperty('categorie', 'INTEGRAL');
    });

    it('should disable a student', async () => {
        const result = await service.disable('1');

        expect(mockPrismaService.disable).toHaveBeenCalledWith('1');
        expect(result.message).toBe('Student deleted successfully');
        expect(result.data).toHaveProperty('name', 'Student');
    });
});
