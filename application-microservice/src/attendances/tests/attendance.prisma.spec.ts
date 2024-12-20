
import { Test, TestingModule } from '@nestjs/testing';
import { AttendancePrismaService } from '../attendance.prisma';
import { PrismaService } from '../../database/prisma.service';
import { CreateAttendanceDto } from '../dtos/CreateAttendance.dto';

describe('AttendancePrismaService', () => {
    let attendancePrismaService: AttendancePrismaService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AttendancePrismaService,
                {
                    provide: PrismaService,
                    useValue: {
                        attendance: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                            updateMany: jest.fn(),
                        },
                        $transaction: jest.fn(),
                    },
                },
            ],
        }).compile();

        attendancePrismaService = module.get<AttendancePrismaService>(AttendancePrismaService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('createAttendance', () => {
        it('should create attendance', async () => {
            const createAttendanceDto: CreateAttendanceDto = {
                studentId: 'student123',
                classId: 'class123',
                date: new Date('2024-01-01T00:00:00.000Z'),
                hasAttended: true,
            };

            const mockAttendance = {
                id: 'attendance123',
                ...createAttendanceDto,
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                updatedAt: new Date('2024-01-01T00:00:00.000Z'),
            };

            jest.spyOn(prismaService.attendance, 'create').mockResolvedValue(mockAttendance);

            const result = await attendancePrismaService.createAttendance(createAttendanceDto);

            expect(result).toEqual(mockAttendance);
            expect(prismaService.attendance.create).toHaveBeenCalledWith({
                data: createAttendanceDto,
            });
        });
    });

    describe('findAttendanceByClass', () => {
        it('should find attendance by class ID', async () => {
            const mockAttendance: any[] = [
                {
                    id: '1',
                    studentId: 'student1',
                    classId: 'class1',
                    date: new Date('2024-12-20T00:00:00.000Z'),
                    hasAttended: true,
                },
                {
                    id: '2',
                    studentId: 'student2',
                    classId: 'class1',
                    date: new Date('2024-12-21T00:00:00.000Z'),
                    hasAttended: false,
                },
            ];

            jest.spyOn(prismaService.attendance, 'findMany').mockResolvedValue(mockAttendance);

            const result = await attendancePrismaService.findAttendanceByClass('class123');

            expect(result).toEqual(mockAttendance);
            expect(prismaService.attendance.findMany).toHaveBeenCalledWith({
                where: { classId: 'class123' },
                select: {
                    id: true,
                    studentId: true,
                    student: true,
                    date: true,
                    classId: true,
                    hasAttended: true,

                },
            });
        });
    });

    describe('findAttendanceByStudent', () => {
        it('should find attendance by student ID', async () => {
            const mockAttendance: any[] = [
                {
                    id: 'attendance124',
                    studentId: 'student124',
                    student: { name: 'Jane Doe' },
                    date: new Date('2024-01-02T00:00:00.000Z'),
                    classId: 'class123',
                    hasAttended: false,
                    createdAt: new Date('2024-01-01T00:00:00.000Z'),
                    updatedAt: new Date('2024-01-01T00:00:00.000Z'),
                },
            ];

            jest.spyOn(prismaService.attendance, 'findMany').mockResolvedValue(mockAttendance);

            const result = await attendancePrismaService.findAttendanceByStudent('student124');

            expect(result).toEqual(mockAttendance);
            expect(prismaService.attendance.findMany).toHaveBeenCalledWith({
                where: { studentId: 'student124' },
                select: {
                    studentId: true,
                    student: true,
                    date: true,
                    classId: true,
                    hasAttended: true,
                },
            });
        });
    });

    describe('findAttendanceByDateAndClass', () => {
        it('should find attendance by date and class ID', async () => {
            const mockAttendance: any[] = [
                {
                    id: 'attendance124',
                    studentId: 'student124',
                    student: { name: 'Jane Doe' },
                    date: new Date('2024-01-02T00:00:00.000Z'),
                    classId: 'class123',
                    hasAttended: false,
                    createdAt: new Date('2024-01-01T00:00:00.000Z'),
                    updatedAt: new Date('2024-01-01T00:00:00.000Z'),
                },
            ];

            jest.spyOn(prismaService.attendance, 'findMany').mockResolvedValue(mockAttendance);

            const result = await attendancePrismaService.findAttendanceByDateAndClass(
                new Date('2024-01-03T00:00:00.000Z'),
                'class124',
            );

            expect(result).toEqual(mockAttendance);
            expect(prismaService.attendance.findMany).toHaveBeenCalledWith({
                where: {
                    date: new Date('2024-01-03T00:00:00.000Z'),
                    classId: 'class124',
                },
                select: {
                    studentId: true,
                    student: true,
                    date: true,
                    classId: true,
                    hasAttended: true,
                },
            });
        });
    });

    describe('updateAttendanceList', () => {
        it('should update multiple attendances', async () => {
            const updateAttendanceDto: CreateAttendanceDto[] = [
                {
                    studentId: 'student123',
                    classId: 'class123',
                    date: new Date('2024-01-01T00:00:00.000Z'),
                    hasAttended: true,
                },
                {
                    studentId: 'student124',
                    classId: 'class123',
                    date: new Date('2024-01-01T00:00:00.000Z'),
                    hasAttended: false,
                },
            ];

            const mockTransactionResults = [
                { count: 1 },
                { count: 1 },
            ];

            jest.spyOn(prismaService, '$transaction').mockResolvedValue(mockTransactionResults);

            const result = await attendancePrismaService.updateAttendanceList({
                attendanceList: updateAttendanceDto,
            });

            expect(result).toBe(2);
            expect(prismaService.$transaction).toHaveBeenCalled();
        });
    });
});
