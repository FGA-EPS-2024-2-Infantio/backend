import { Test } from '@nestjs/testing';
import { AttendanceService } from '../attendance.service';
import { AttendancePrismaService } from '../attendance.prisma';
import { CreateAttendanceDto } from '../dtos/CreateAttendance.dto';

describe('AttendanceService', () => {
    let attendanceService: AttendanceService;
    let mockAttendancePrismaService: Partial<AttendancePrismaService>;

    beforeEach(async () => {
        mockAttendancePrismaService = {
            createAttendance: jest.fn().mockResolvedValue({
                id: '1',
                classId: 'class123',
                studentId: 'student123',
                date: new Date('2024-01-01'),
                hasAttended: true,
            }),
            findAttendanceByClass: jest.fn().mockResolvedValue([
                {
                    id: '1',
                    classId: 'class123',
                    studentId: 'student123',
                    date: new Date('2024-01-01'),
                    hasAttended: true,
                },
            ]),
            findAttendanceByStudent: jest.fn().mockResolvedValue([
                {
                    id: '1',
                    classId: 'class123',
                    studentId: 'student123',
                    date: new Date('2024-01-01'),
                    hasAttended: true,
                },
            ]),
            findAttendanceByDateAndClass: jest.fn().mockResolvedValue([
                {
                    id: '1',
                    classId: 'class123',
                    studentId: 'student123',
                    date: new Date('2024-01-01'),
                    hasAttended: true,
                },
            ]),
            getById: jest.fn().mockResolvedValue({
                id: '1',
                classId: 'class123',
                studentId: 'student123',
                date: new Date('2024-01-01'),
                hasAttended: true,
            }),
            get: jest.fn().mockResolvedValue([
                {
                    id: '1',
                    classId: 'class123',
                    studentId: 'student123',
                    date: new Date('2024-01-01'),
                    hasAttended: true,
                },
            ]),
            updateAttendanceList: jest.fn().mockResolvedValue(1),
            update: jest.fn().mockResolvedValue({
                id: '1',
                classId: 'class123',
                studentId: 'student123',
                date: new Date('2024-01-01'),
                hasAttended: false,
            }),
        };

        const module = await Test.createTestingModule({
            providers: [
                AttendanceService,
                { provide: AttendancePrismaService, useValue: mockAttendancePrismaService },
            ],
        }).compile();

        attendanceService = module.get(AttendanceService);
    });

    afterEach(() => jest.clearAllMocks());

    describe('create', () => {
        it('Should create attendance', async () => {
            const createAttendanceDto: CreateAttendanceDto = {
                classId: 'class123',
                studentId: 'student123',
                date: new Date('2024-01-01'),
                hasAttended: true,
            };
            const result = await attendanceService.create(createAttendanceDto);
            expect(result).toHaveProperty('id', '1');
            expect(result).toHaveProperty('classId', 'class123');
            expect(result).toHaveProperty('studentId', 'student123');
        });
    });

    describe('findAllByClass', () => {
        it('Should return attendance by class ID', async () => {
            const result = await attendanceService.findAllByClass('class123');
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toHaveProperty('classId', 'class123');
        });
    });

    describe('findAllByStudent', () => {
        it('Should return attendance by student ID', async () => {
            const result = await attendanceService.findAllByStudent('student123');
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toHaveProperty('studentId', 'student123');
        });
    });

    describe('findAllByDateAndClass', () => {
        it('Should return attendance by date and class', async () => {
            const result = await attendanceService.findAllByDateAndClass(
                new Date('2024-01-01'),
                'class123',
            );
            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toHaveProperty('date');
            expect(result[0]).toHaveProperty('classId', 'class123');
        });
    });

    describe('getById', () => {
        it('Should return attendance by ID', async () => {
            const result = await attendanceService.getById('1');
            expect(result).toHaveProperty('id', '1');
        });
    });

    describe('get', () => {
        it('Should return all attendance records', async () => {
            const result = await attendanceService.get();
            expect(result).toBeInstanceOf(Array);
        });
    });

    describe('updateAttendanceList', () => {
        it('Should update attendance list', async () => {
            const input = { attendanceList: [{ classId: 'class123', studentId: 'student123', date: new Date('2024-01-01'), hasAttended: true }] };
            const result = await attendanceService.updateAttendanceList(input);
            expect(result).toBe(1);
        });
    });

    describe('update', () => {
        it('Should update attendance', async () => {
            const input = {
                data: { classId: 'class123', studentId: 'student123', date: new Date('2024-01-01'), hasAttended: false },
                attendanceId: '1',
            };
            const result = await attendanceService.update(input);
            expect(result).toHaveProperty('hasAttended', false);
        });
    });
});
