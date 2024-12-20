import { Test } from '@nestjs/testing';
import { ClassesService } from '../class.service';
import { ClassesPrismaService } from '../class.prisma';
import { CreateClassDto } from '../dtos/CreateClass.dto';

describe('ClassesService', () => {
    let classesService: ClassesService;
    let mockClassesPrismaService: Partial<ClassesPrismaService>;

    beforeEach(async () => {
        mockClassesPrismaService = {
            create: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Class Name',
                teacherId: 'teacher123',
                userId: 'user123',
                disabled: false,
            }),
            findAll: jest.fn().mockResolvedValue([
                { id: '1', name: 'Class Name', teacherId: 'teacher123', userId: 'user123', disabled: false },
            ]),
            get: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Class Name',
                teacherId: 'teacher123',
                userId: 'user123',
                disabled: false,
            }),
            disable: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Class Name',
                teacherId: 'teacher123',
                userId: 'user123',
                disabled: true,
            }),
            update: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Updated Class Name',
                teacherId: 'teacher123',
                userId: 'user123',
                disabled: false,
            }),
            updateStudents: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Class Name',
                teacherId: 'teacher123',
                userId: 'user123',
                disabled: false,
            }),
            findStudentsByClass: jest.fn().mockResolvedValue([
                { id: '1', name: 'Student 1', classId: '1' },
            ]),
        };

        const module = await Test.createTestingModule({
            providers: [
                ClassesService,
                { provide: ClassesPrismaService, useValue: mockClassesPrismaService },
            ],
        }).compile();

        classesService = module.get(ClassesService);
    });

    afterEach(() => jest.clearAllMocks());

    describe('create', () => {
        it('Should create a class', async () => {
            const createClassDto: CreateClassDto = {
                name: 'Class Name',
                teacherId: 'teacher123',
                userId: 'user123',
                disabled: false,
            };
            const result = await classesService.create(createClassDto);
            expect(result).toHaveProperty('id', '1');
            expect(result).toHaveProperty('name', 'Class Name');
            expect(result).toHaveProperty('teacherId', 'teacher123');
        });
    });

    describe('findAll', () => {
        it('Should return an array of classes', async () => {
            const result = await classesService.findAll({ userId: 'user123' });
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toHaveProperty('name', 'Class Name');
        });
    });

    describe('get', () => {
        it('Should return a class by ID', async () => {
            const result = await classesService.get('1');
            expect(result).toHaveProperty('id', '1');
            expect(result).toHaveProperty('name', 'Class Name');
        });
    });

    describe('disable', () => {
        it('Should disable a class', async () => {
            const result = await classesService.disable('1');
            expect(result).toHaveProperty('disabled', true);
        });
    });

    describe('update', () => {
        it('Should update a class', async () => {
            const updateClassDto: CreateClassDto = {
                name: 'Updated Class Name',
                teacherId: 'teacher123',
                userId: 'user123',
                disabled: false,
            };
            const result = await classesService.update({ data: updateClassDto, classId: '1' });
            expect(result).toHaveProperty('name', 'Updated Class Name');
        });
    });

    describe('updateStudents', () => {
        it('Should update students in a class', async () => {
            const result = await classesService.updateStudents('1', ['student1', 'student2']);
            expect(result).toHaveProperty('id', '1');
            expect(result).toHaveProperty('name', 'Class Name');
        });
    });

    describe('findStudentsByClass', () => {
        it('Should return students in a class', async () => {
            const result = await classesService.findStudentsByClass('1');
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toHaveProperty('name', 'Student 1');
        });
    });
});
