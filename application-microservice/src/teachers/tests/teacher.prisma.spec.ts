import { Test, TestingModule } from '@nestjs/testing';
import { TeachersPrismaService } from '../teacher.prisma';
import { PrismaService } from '../../database/prisma.service';
import { CreateTeacherDto } from '../dtos/CreateTeacher.dto';
import { TeacherResponseDto } from '../dtos/TeacherResponse.dto';

describe('TeachersPrismaService', () => {
    let teachersPrismaService: TeachersPrismaService;
    let prismaService: PrismaService;

    beforeEach(() => {
        prismaService = {
            teacher: {
                create: jest.fn(),
                findMany: jest.fn(),
                findUnique: jest.fn(),
                update: jest.fn(),
            },
            class: {
                findMany: jest.fn(),
            },
        } as unknown as PrismaService;

        teachersPrismaService = new TeachersPrismaService(prismaService);
    });

    describe('createTeacher', () => {
        it('should create a teacher', async () => {
            const createTeacherDto: CreateTeacherDto = {
                name: 'Teacher Name',
                userId: 'user123',
                numberOfClasses: 5,
                cpf: '12345678901',
                startDate: new Date('2024-01-01'),
                schoolId: 'school123',
                directorId: 'director123',
            };

            const mockTeacher = {
                id: 'teacher123',
                name: 'Teacher Name',
                userId: 'user123',
                numberOfClasses: 5,
                cpf: '12345678901',
                startDate: new Date('2024-01-01'),
                schoolId: 'school123',
                disabled: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                disabledAt: null,
            };

            jest.spyOn(prismaService.teacher, 'create').mockResolvedValue(mockTeacher);

            const result = await teachersPrismaService.createTeacher(createTeacherDto);

            expect(result).toEqual(mockTeacher);
            expect(prismaService.teacher.create).toHaveBeenCalledWith({
                data: {
                    name: 'Teacher Name',
                    userId: 'user123',
                    numberOfClasses: 5,
                    cpf: '12345678901',
                    startDate: new Date('2024-01-01'),
                    school: { connect: { id: 'school123' } },
                },
            });
        });
    });

    describe('findAllTeachers', () => {
        it('should return a list of teachers', async () => {
            const mockTeachers = [
                {
                    id: 'teacher123',
                    name: 'Teacher Name',
                    userId: 'user123',
                    numberOfClasses: 5,
                    cpf: '12345678901',
                    startDate: new Date('2024-01-01'),
                    schoolId: 'school123',
                    disabled: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    disabledAt: null,
                },
            ];

            jest.spyOn(prismaService.teacher, 'findMany').mockResolvedValue(mockTeachers);

            const result = await teachersPrismaService.findAllTeachers({ userId: 'user123' });

            expect(result).toEqual(mockTeachers);
            expect(prismaService.teacher.findMany).toHaveBeenCalledWith({
                where: { school: { userId: 'user123' } },
            });
        });
    });

    describe('get', () => {
        it('should return a teacher by ID', async () => {
            const mockTeacher = {
                id: 'teacher123',
                name: 'Teacher Name',
                userId: 'user123',
                numberOfClasses: 5,
                cpf: '12345678901',
                startDate: new Date('2024-01-01'),
                schoolId: 'school123',
                disabled: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                disabledAt: null,
            };

            jest.spyOn(prismaService.teacher, 'findUnique').mockResolvedValue(mockTeacher);

            const result = await teachersPrismaService.get('teacher123');

            expect(result).toEqual(mockTeacher);
            expect(prismaService.teacher.findUnique).toHaveBeenCalledWith({
                where: { id: 'teacher123' },
            });
        });
    });

    describe('update', () => {
        it('should update a teacher', async () => {
            const updateData = {
                name: 'Updated Teacher',
                userId: 'user123',
                numberOfClasses: 7,
                cpf: '98765432101',
                startDate: new Date('2024-01-01'),
                schoolId: 'school123',
                directorId: 'director123',
            };

            const mockUpdatedTeacher = {
                ...updateData,
                id: 'teacher123',
                disabled: false,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date(),
                disabledAt: null,
            };

            jest.spyOn(prismaService.teacher, 'update').mockResolvedValue(mockUpdatedTeacher);

            const result = await teachersPrismaService.update({
                data: updateData,
                teacherId: 'teacher123',
            });

            expect(result).toEqual(mockUpdatedTeacher);
            expect(prismaService.teacher.update).toHaveBeenCalledWith({
                where: { id: 'teacher123' },
                data: updateData,
            });
        });
    });

    describe('findClassesByTeacher', () => {
        it('should return classes by teacher', async () => {
            const mockClasses = [
                {
                    id: 'class123',
                    name: 'Math Class',
                    teacherId: 'teacher123',
                    schoolId: 'school123',
                    disabled: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    disabledAt: null,
                    students: [
                        { id: 'student123', name: 'Student 1', classId: 'class123', createdAt: new Date(), updatedAt: new Date() },
                        { id: 'student124', name: 'Student 2', classId: 'class123', createdAt: new Date(), updatedAt: new Date() },
                    ],
                },
            ];

            jest.spyOn(prismaService.class, 'findMany').mockResolvedValue(mockClasses);

            const result = await teachersPrismaService.findClassesByTeacher('teacher123');

            expect(result).toEqual(mockClasses);
            expect(prismaService.class.findMany).toHaveBeenCalledWith({
                where: { teacher: { userId: 'teacher123' } },
                include: { students: true },
            });
        });
    });
});
