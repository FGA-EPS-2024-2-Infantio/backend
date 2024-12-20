import { Test } from '@nestjs/testing';
import { ClassMicroserviceController } from '../class.controller';
import { ClassesService } from '../class.service';
import { CreateClassDto } from '../dtos/CreateClass.dto';
import { ClassResponseDto } from '../dtos/ClassResponse.dto';

describe('ClassMicroserviceController', () => {
    let classController: ClassMicroserviceController;
    let mockClassesService: Partial<ClassesService>;
    let mockNatsService: Partial<any>;

    beforeEach(async () => {
        mockClassesService = {
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
            update: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Updated Class Name',
                teacherId: 'teacher123',
                userId: 'user123',
                disabled: false,
            }),
            disable: jest.fn().mockResolvedValue({
                message: 'Class successfully disabled',
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

        mockNatsService = {
            emit: jest.fn(),
            send: jest.fn(),
        };

        const module = await Test.createTestingModule({
            controllers: [ClassMicroserviceController],
            providers: [
                { provide: ClassesService, useValue: mockClassesService },
                { provide: 'NATS_SERVICE', useValue: mockNatsService },
            ],
        }).compile();

        classController = module.get(ClassMicroserviceController);
    });

    afterEach(() => jest.clearAllMocks());

    describe('createClass', () => {
        it('Should create a class', async () => {
            const createClassDto: CreateClassDto = {
                name: 'Class Name',
                teacherId: 'teacher123',
                userId: 'user123',
                disabled: false,
            };
            const result = await classController.createClass(createClassDto);
            expect(result).toHaveProperty('id', '1');
            expect(result).toHaveProperty('name', 'Class Name');
            expect(result).toHaveProperty('teacherId', 'teacher123');
            expect(result).toHaveProperty('userId', 'user123');
        });
    });

    describe('getAllClasses', () => {
        it('Should return an array of classes', async () => {
            const result = await classController.getAllClasses({ userId: 'user123' });
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toHaveProperty('name', 'Class Name');
        });
    });

    describe('get', () => {
        it('Should return a class', async () => {
            const result = await classController.get('1');
            expect(result).toHaveProperty('id', '1');
            expect(result).toHaveProperty('name', 'Class Name');
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
            const result = await classController.update({
                data: updateClassDto,
                classId: '1',
            });
            expect(result).toHaveProperty('name', 'Updated Class Name');
        });
    });

    describe('disable', () => {
        it('Should disable a class', async () => {
            const result = await classController.disable('1');
            expect(result).toHaveProperty('message', 'Class successfully disabled');
        });
    });

    describe('updateStudents', () => {
        it('Should update students in a class', async () => {
            const result = await classController.updateStudents({
                classId: '1',
                studentIds: ['1', '2'],
            });
            expect(result).toHaveProperty('id', '1');
            expect(result).toHaveProperty('name', 'Class Name');
        });
    });

    describe('getClassStudents', () => {
        it('Should return students in a class', async () => {
            const result = await classController.getClassStudents('1');
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toHaveProperty('name', 'Student 1');
        });
    });
});
