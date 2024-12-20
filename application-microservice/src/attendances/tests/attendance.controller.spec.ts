import { Test } from '@nestjs/testing';
import { AttendanceMicroserviceController } from '../attendance.controller';
import { AttendanceService } from '../attendance.service';
import { CreateAttendanceDto } from '../dtos/CreateAttendance.dto';
import { AttendanceResponseDto } from '../dtos/AttendanceResponse.dto';
import { PrismaService } from '../../database/prisma.service';

describe('AttendanceMicroserviceController', () => {
    let controller: AttendanceMicroserviceController;
    let mockAttendanceService: Partial<AttendanceService>;
    let mockPrismaService: Partial<PrismaService>;
    let mockNatsService: Partial<any>;

    beforeEach(async () => {
        mockPrismaService = {
            attendance: {
                createMany: jest.fn(),
                findMany: jest.fn(),
                findUnique: jest.fn(),
                update: jest.fn(),
            },
        } as unknown as Partial<PrismaService>;

        mockAttendanceService = {
            findAllByClass: jest.fn().mockResolvedValue([]),
            findAllByStudent: jest.fn().mockResolvedValue([]),
            findAllByDateAndClass: jest.fn().mockResolvedValue([]),
            getById: jest.fn().mockResolvedValue({} as AttendanceResponseDto),
            get: jest.fn().mockResolvedValue([]),
            update: jest.fn().mockResolvedValue({} as AttendanceResponseDto),
            updateAttendanceList: jest.fn().mockResolvedValue(1),
        };

        mockNatsService = {
            emit: jest.fn(),
            send: jest.fn(),
        };

        const module = await Test.createTestingModule({
            controllers: [AttendanceMicroserviceController],
            providers: [
                { provide: AttendanceService, useValue: mockAttendanceService },
                { provide: PrismaService, useValue: mockPrismaService },
                { provide: 'NATS_SERVICE', useValue: mockNatsService },
            ],
        }).compile();

        controller = module.get(AttendanceMicroserviceController);
    });

    afterEach(() => jest.clearAllMocks());

    describe('createAttendance', () => {
        it('Should create attendance records', async () => {
            const createAttendanceDtos: CreateAttendanceDto[] = [
                {
                    classId: 'class123',
                    studentId: 'student123',
                    date: new Date('2024-01-01'),
                    hasAttended: true,
                },
            ];

            mockPrismaService.attendance.createMany = jest.fn().mockResolvedValue({ count: 1 });

            const response = await controller.createAttendance(createAttendanceDtos);
            expect(response.success).toBe(true);
            expect(response.data).toHaveProperty('count', 1);
            expect(response.message).toBe('Attendance created successfully');
        });
    });

    describe('getAllAttendanceByClass', () => {
        it('Should return attendance records by class ID', async () => {
            const classId = 'class123';
            const result = await controller.getAllAttendanceByClass(classId);
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('getAllAttendanceByStudent', () => {
        it('Should return attendance records by student ID', async () => {
            const studentId = 'student123';
            const result = await controller.getAllAttendenceByStudent(studentId);
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('getAllAttendanceByDate', () => {
        it('Should return attendance records by date and class ID', async () => {
            const payload = { date: new Date('2024-01-01'), classId: 'class123' };
            const result = await controller.getAllAttendenceByDate(payload);
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('getAttendanceById', () => {
        it('Should return attendance record by ID', async () => {
            const attendanceId = 'attendance123';
            const result = await controller.getAttendenceById(attendanceId);
            expect(result).toBeInstanceOf(Object);
        });
    });

    describe('getAttendence', () => {
        it('Should return all attendance records', async () => {
            const result = await controller.getAttendence();
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('update', () => {
        it('Should update an attendance record', async () => {
            const updateData = {
                data: {
                    classId: 'class123',
                    studentId: 'student123',
                    date: new Date('2024-01-01'),
                    hasAttended: false,
                },
                attendanceId: 'attendance123',
            };

            mockAttendanceService.update = jest.fn().mockResolvedValue(updateData.data);

            const result = await controller.update(updateData);
            expect(result).toEqual(updateData.data);
        });
    });

    describe('updateAttendanceList', () => {
        it('Should update a list of attendance records', async () => {
            const updateList = [
                {
                    classId: 'class123',
                    studentId: 'student123',
                    date: new Date('2024-01-01'),
                    hasAttended: true,
                },
            ];

            mockAttendanceService.updateAttendanceList = jest.fn().mockResolvedValue(1);

            const result = await controller.updateAttendanceList({ attendanceList: updateList });
            expect(result).toBe(1);
        });
    });
});
