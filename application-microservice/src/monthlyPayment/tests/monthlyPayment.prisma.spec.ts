import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyPaymentPrismaService } from '../monthlyPayment.prisma';
import { PrismaService } from '../../database/prisma.service';
import { CreateMonthlyPaymentDto } from '../dtos/CreateMonthlyPayment.dto';
import { MonthlyPaymentResponseDto } from '../dtos/MonthlyPayment.dto';

describe('MonthlyPaymentPrismaService', () => {
    let monthlyPaymentPrismaService: MonthlyPaymentPrismaService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MonthlyPaymentPrismaService,
                {
                    provide: PrismaService,
                    useValue: {
                        monthlyPayment: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        monthlyPaymentPrismaService = module.get<MonthlyPaymentPrismaService>(MonthlyPaymentPrismaService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('create', () => {
        it('should create a monthly payment', async () => {
            const createMonthlyPaymentDto: CreateMonthlyPaymentDto = {
                studentId: 'student123',
                month: 12,
                year: 2024,
                payed: true,
                value: 1500,
            };

            const mockMonthlyPayment = {
                id: 'payment123',
                studentId: 'student123',
                month: 12,
                year: 2024,
                payed: true,
                value: 1500,
                disabled: false,
                disabledAt: null,
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                updatedAt: new Date('2024-12-20T00:00:00.000Z'),
            };

            jest.spyOn(prismaService.monthlyPayment, 'create').mockResolvedValue(mockMonthlyPayment);

            const result = await monthlyPaymentPrismaService.create(createMonthlyPaymentDto);

            expect(result).toEqual(mockMonthlyPayment);
            expect(prismaService.monthlyPayment.create).toHaveBeenCalledWith({ data: createMonthlyPaymentDto });
        });
    });

    describe('findAll', () => {
        it('should return all monthly payments', async () => {
            const mockMonthlyPayments = [
                {
                    id: 'payment123',
                    studentId: 'student123',
                    month: 12,
                    year: 2024,
                    payed: true,
                    value: 1500,
                    disabled: false,
                    disabledAt: null,
                    createdAt: new Date('2024-01-01T00:00:00.000Z'),
                    updatedAt: new Date('2024-12-20T00:00:00.000Z'),
                },
            ];

            jest.spyOn(prismaService.monthlyPayment, 'findMany').mockResolvedValue(mockMonthlyPayments);

            const result = await monthlyPaymentPrismaService.findAll();

            expect(result).toEqual(mockMonthlyPayments);
            expect(prismaService.monthlyPayment.findMany).toHaveBeenCalled();
        });
    });

    describe('get', () => {
        it('should return a monthly payment by ID', async () => {
            const mockMonthlyPayment = {
                id: 'payment123',
                studentId: 'student123',
                month: 12,
                year: 2024,
                payed: true,
                value: 1500,
                disabled: false,
                disabledAt: null,
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                updatedAt: new Date('2024-12-20T00:00:00.000Z'),
            };

            jest.spyOn(prismaService.monthlyPayment, 'findUnique').mockResolvedValue(mockMonthlyPayment);

            const result = await monthlyPaymentPrismaService.get('payment123');

            expect(result).toEqual(mockMonthlyPayment);
            expect(prismaService.monthlyPayment.findUnique).toHaveBeenCalledWith({
                where: { id: 'payment123' },
            });
        });
    });

    describe('update', () => {
        it('should update a monthly payment', async () => {
            const updateMonthlyPaymentDto: CreateMonthlyPaymentDto = {
                studentId: 'student123',
                month: 12,
                year: 2024,
                payed: false,
                value: 1600,
            };

            const mockUpdatedMonthlyPayment = {
                id: 'payment123',
                studentId: 'student123',
                month: 12,
                year: 2024,
                payed: false,
                value: 1600,
                disabled: false,
                disabledAt: null,
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                updatedAt: new Date('2024-12-20T00:00:00.000Z'),
            };

            jest.spyOn(prismaService.monthlyPayment, 'update').mockResolvedValue(mockUpdatedMonthlyPayment);

            const result = await monthlyPaymentPrismaService.update({
                data: updateMonthlyPaymentDto,
                monthlyPaymentId: 'payment123',
            });

            expect(result).toEqual(mockUpdatedMonthlyPayment);
            expect(prismaService.monthlyPayment.update).toHaveBeenCalledWith({
                where: { id: 'payment123' },
                data: updateMonthlyPaymentDto,
            });
        });
    });

    describe('disable', () => {
        it('should disable a monthly payment', async () => {
            const mockDisabledMonthlyPayment = {
                id: 'payment123',
                studentId: 'student123',
                month: 12,
                year: 2024,
                payed: false,
                value: 1500,
                disabled: true,
                disabledAt: new Date('2024-12-20T00:00:00.000Z'),
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                updatedAt: new Date('2024-12-20T00:00:00.000Z'),
            };

            jest.spyOn(prismaService.monthlyPayment, 'update').mockResolvedValue(mockDisabledMonthlyPayment);

            const result = await monthlyPaymentPrismaService.disable('payment123');

            expect(result).toEqual(mockDisabledMonthlyPayment);
            expect(prismaService.monthlyPayment.update).toHaveBeenCalledWith({
                where: { id: 'payment123' },
                data: { disabled: true, disabledAt: expect.any(Date) },
            });
        });
    });
});
