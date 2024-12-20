import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
import { CreateSchoolDto } from '../dtos/CreateSchool.dto';
import { SchoolResponseDto } from '../dtos/SchoolResponse.dto';
import { SchoolsPrismaService } from '../school.prisma';
import { CategorieType, ClassType, TurnType } from '@prisma/client';

describe('SchoolsPrismaService', () => {
    let schoolsPrismaService: SchoolsPrismaService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SchoolsPrismaService,
                {
                    provide: PrismaService,
                    useValue: {
                        school: {
                            create: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            update: jest.fn(),
                        },
                        class: {
                            findMany: jest.fn(),
                        },
                        student: {
                            findMany: jest.fn(),
                        },
                        teacher: {
                            findMany: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        schoolsPrismaService = module.get<SchoolsPrismaService>(SchoolsPrismaService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('create', () => {
        it('should create a school', async () => {
            const createSchoolDto: CreateSchoolDto = {
                name: 'Example School',
                directorEmail: 'director@example.com',
                numberStudents: 100,
                userId: 'user123',
            };

            const mockSchool = {
                id: 'school123',
                ...createSchoolDto,
                createdAt: new Date(),
                updatedAt: new Date(),
                disabled: false,
                disabledAt: null,
            };

            jest.spyOn(prismaService.school, 'create').mockResolvedValue(mockSchool);

            const result = await schoolsPrismaService.create(createSchoolDto);

            expect(result).toEqual(mockSchool);
            expect(prismaService.school.create).toHaveBeenCalledWith({ data: createSchoolDto });
        });
    });

    describe('findAll', () => {
        it('should return all schools', async () => {
            const mockSchools = [
                {
                    id: 'school123',
                    name: 'Example School',
                    directorEmail: 'director@example.com',
                    numberStudents: 100,
                    userId: 'user123',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    disabled: false,
                    disabledAt: null,
                },
            ];

            jest.spyOn(prismaService.school, 'findMany').mockResolvedValue(mockSchools);

            const result = await schoolsPrismaService.findAll();

            expect(result).toEqual(mockSchools);
            expect(prismaService.school.findMany).toHaveBeenCalledWith({
                orderBy: [
                    { disabledAt: 'desc' },
                    { name: 'asc' },
                ],
            });
        });
    });

    describe('get', () => {
        it('should return a school by ID', async () => {
            const mockSchool = {
                id: 'school123',
                name: 'Example School',
                directorEmail: 'director@example.com',
                numberStudents: 100,
                userId: 'user123',
                createdAt: new Date(),
                updatedAt: new Date(),
                disabled: false,
                disabledAt: null,
            };

            jest.spyOn(prismaService.school, 'findUnique').mockResolvedValue(mockSchool);

            const result = await schoolsPrismaService.get('school123');

            expect(result).toEqual(mockSchool);
            expect(prismaService.school.findUnique).toHaveBeenCalledWith({
                where: { id: 'school123' },
            });
        });
    });

    describe('disable', () => {
        it('should disable a school', async () => {
            const mockDisabledSchool = {
                id: 'school123',
                name: 'Example School',
                directorEmail: 'director@example.com',
                numberStudents: 100,
                userId: 'user123',
                createdAt: new Date(),
                updatedAt: new Date(),
                disabled: true,
                disabledAt: new Date(),
            };

            jest.spyOn(prismaService.school, 'update').mockResolvedValue(mockDisabledSchool);

            const result = await schoolsPrismaService.disable('school123');

            expect(result).toEqual(mockDisabledSchool);
            expect(prismaService.school.update).toHaveBeenCalledWith({
                where: { id: 'school123' },
                data: { disabled: true, disabledAt: expect.any(Date) },
            });
        });
    });

    describe('update', () => {
        it('should update a school', async () => {
            const updateData: CreateSchoolDto = {
                name: 'Updated School',
                directorEmail: 'updated@example.com',
                numberStudents: 200,
                userId: 'user123',
            };

            const mockUpdatedSchool = {
                id: 'school123',
                ...updateData,
                createdAt: new Date(),
                updatedAt: new Date(),
                disabled: false,
                disabledAt: null,
            };

            jest.spyOn(prismaService.school, 'update').mockResolvedValue(mockUpdatedSchool);

            const result = await schoolsPrismaService.update({ data: updateData, schoolId: 'school123' });

            expect(result).toEqual(mockUpdatedSchool);
            expect(prismaService.school.update).toHaveBeenCalledWith({
                where: { id: 'school123' },
                data: updateData,
            });
        });
    });

    describe('findClassesBySchool', () => {
        it('should return classes by school ID', async () => {
            const mockClasses = [
                {
                    id: 'class123',
                    name: 'Math Class',
                    schoolId: 'school123',
                    teacherId: 'teacher123',
                    createdAt: new Date('2024-01-01T00:00:00.000Z'),
                    updatedAt: new Date('2024-01-02T00:00:00.000Z'),
                    disabled: false,
                    disabledAt: null,
                },
            ];

            jest.spyOn(prismaService.class, 'findMany').mockResolvedValue(mockClasses);

            const result = await schoolsPrismaService.findClassesBySchool('school123');

            expect(result).toEqual(mockClasses);
            expect(prismaService.class.findMany).toHaveBeenCalledWith({
                where: { schoolId: 'school123' },
            });
        });
    });

    describe('findStudentsBySchool', () => {
        it('should return students by school ID', async () => {
            const mockStudents = [
                {
                    id: 'student123',
                    name: 'John Doe',
                    schoolId: 'school123',
                    createdAt: new Date('2024-01-01T00:00:00.000Z'),
                    updatedAt: new Date('2024-01-02T00:00:00.000Z'),
                    disabled: false,
                    disabledAt: null,
                    class: ClassType.BERCARIO,
                    categorie: CategorieType.PARCIAL,
                    turn: TurnType.MATUTINO,
                    dataNascimento: '2010-01-01',
                    naturalidadeAluno: 'São Paulo',
                    endereco: 'Rua Exemplo, 123',
                    cep: '12345-678',
                    isFilled: true,
                    mae: JSON.stringify({
                        nome: 'Maria Silva',
                        telefone: '111111111',
                        cpf: '12345678901',
                        rg: '1234567',
                        naturalidade: 'São Paulo',
                    }),
                    pai: JSON.stringify({
                        nome: 'José Silva',
                        telefone: '222222222',
                        cpf: '98765432100',
                        rg: '7654321',
                        naturalidade: 'Rio de Janeiro',
                    }),
                    responsaveis: JSON.stringify([
                        { nome: 'Ana', parentesco: 'Tia', telefone: '333333333' },
                    ]),
                    observacoes: JSON.stringify([{ titulo: 'Alergia', descricao: 'Amendoim' }]),
                    observacoesMedicas: JSON.stringify({
                        hospital: 'Hospital Exemplo',
                        telefoneHospital: '444444444',
                        medico: 'Dr. Fulano',
                        telefoneMedico: '555555555',
                        enderecoHospital: 'Av. Saúde, 123',
                        possuiConvenio: true,
                        alergias: 'Amendoim',
                        medicamentosFebre: 'Paracetamol',
                        medicamentosVomito: 'Dramin',
                        observacoesGerais: 'Nenhuma',
                    }),
                    payments: [],
                },
            ];
            jest.spyOn(prismaService.student, 'findMany').mockResolvedValue(mockStudents);

            const result = await schoolsPrismaService.findStudentsBySchool('school123');

            expect(result).toEqual(mockStudents);
            expect(prismaService.student.findMany).toHaveBeenCalledWith({
                where: { schoolId: 'school123' },
            });
        });
    });

    describe('findTeachersBySchool', () => {
        it('should return teachers by school ID', async () => {
            const mockTeachers = [
                {
                    id: 'teacher123',
                    name: 'Jane Doe',
                    userId: 'user123',
                    schoolId: 'school123',
                    createdAt: new Date('2024-01-01T00:00:00.000Z'),
                    updatedAt: new Date('2024-01-02T00:00:00.000Z'),
                    disabled: false,
                    disabledAt: null,
                    numberOfClasses: 5,
                    cpf: '12345678901',
                    startDate: new Date('2024-01-01T00:00:00.000Z'),
                },
            ];

            jest.spyOn(prismaService.teacher, 'findMany').mockResolvedValue(mockTeachers);

            const result = await schoolsPrismaService.findTeachersBySchool('school123');

            expect(result).toEqual(mockTeachers);
            expect(prismaService.teacher.findMany).toHaveBeenCalledWith({
                where: { schoolId: 'school123' },
            });
        });
    });
});
