import { Test } from '@nestjs/testing';
import { MonthlyPaymentService } from '../monthlyPayment.service';
import { MonthlyPaymentPrismaService } from '../monthlyPayment.prisma';
import { CreateMonthlyPaymentDto } from '../dtos/CreateMonthlyPayment.dto';

describe('MonthlyPaymentService', () => {
    let service: MonthlyPaymentService;
    let mockPrismaService: Partial<MonthlyPaymentPrismaService>;

    beforeEach(async () => {
        mockPrismaService = {
            create: jest.fn().mockResolvedValue({
                id: '1',
                studentId: 'student1',
                month: 12,
                year: 2024,
                payed: true,
                value: 200,
            }),
            findAll: jest.fn().mockResolvedValue([
                {
                    id: '1',
                    studentId: 'student1',
                    month: 12,
                    year: 2024,
                    payed: true,
                    value: 200,
                },
            ]),
            get: jest.fn().mockResolvedValue({
                id: '1',
                studentId: 'student1',
                month: 12,
                year: 2024,
                payed: true,
                value: 200,
            }),
            update: jest.fn().mockResolvedValue({
                id: '1',
                studentId: 'student1',
                month: 11,
                year: 2024,
                payed: false,
                value: 220,
            }),
            disable: jest.fn().mockResolvedValue({
                message: 'Payment successfully disabled',
            }),
        };

        const module = await Test.createTestingModule({
            providers: [
                MonthlyPaymentService,
                { provide: MonthlyPaymentPrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get(MonthlyPaymentService);
    });

    afterEach(() => jest.clearAllMocks());

    describe('create', () => {
        it('should create a monthly payment', async () => {
            const createDto: CreateMonthlyPaymentDto = {
                studentId: 'student1',
                month: 12,
                year: 2024,
                payed: true,
                value: 200,
            };
            const result = await service.create(createDto);

            expect(mockPrismaService.create).toHaveBeenCalledWith(createDto);
            expect(result).toEqual({
                id: '1',
                studentId: 'student1',
                month: 12,
                year: 2024,
                payed: true,
                value: 200,
            });
        });
    });

    describe('findAll', () => {
        it('should return all monthly payments', async () => {
            const result = await service.findAll();

            expect(mockPrismaService.findAll).toHaveBeenCalled();
            expect(result).toEqual([
                {
                    id: '1',
                    studentId: 'student1',
                    month: 12,
                    year: 2024,
                    payed: true,
                    value: 200,
                },
            ]);
        });
    });

    describe('get', () => {
        it('should return a monthly payment by ID', async () => {
            const result = await service.get('1');

            expect(mockPrismaService.get).toHaveBeenCalledWith('1');
            expect(result).toEqual({
                id: '1',
                studentId: 'student1',
                month: 12,
                year: 2024,
                payed: true,
                value: 200,
            });
        });
    });

    describe('update', () => {
        it('should update a monthly payment', async () => {
            const updateDto: CreateMonthlyPaymentDto = {
                studentId: 'student1',
                month: 11,
                year: 2024,
                payed: false,
                value: 220,
            };
            const result = await service.update({ data: updateDto, monthlyPaymentId: '1' });

            expect(mockPrismaService.update).toHaveBeenCalledWith({ data: updateDto, monthlyPaymentId: '1' });
            expect(result).toEqual({
                id: '1',
                studentId: 'student1',
                month: 11,
                year: 2024,
                payed: false,
                value: 220,
            });
        });
    });

    describe('disable', () => {
        it('should disable a monthly payment', async () => {
            const result = await service.disable('1');

            expect(mockPrismaService.disable).toHaveBeenCalledWith('1');
            expect(result).toEqual({
                message: 'Payment successfully disabled',
            });
        });
    });
});
