
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
import { ClassesPrismaService } from '../class.prisma';
import { CategorieType, ClassType, TurnType } from '@prisma/client';

describe('ClassesPrismaService', () => {
    let classesPrismaService: ClassesPrismaService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ClassesPrismaService, {
                provide: PrismaService,
                useValue: {
                    class: {
                        create: jest.fn(),
                        findMany: jest.fn(),
                        findUnique: jest.fn(),
                        update: jest.fn(),
                    },
                    school: {
                        findUnique: jest.fn(),
                    },
                    student: {
                        findMany: jest.fn(),
                    },
                },
            }],
        }).compile();

        classesPrismaService = module.get<ClassesPrismaService>(ClassesPrismaService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('create', () => {
        it('should create a class', async () => {
            const createClassDto = {
                name: 'Math Class',
                teacherId: 'teacher123',
                userId: 'user123',
            };

            const mockSchool = {
                id: 'school123',
                userId: 'user123',
                name: 'Example School',
                directorEmail: 'director@example.com',
                numberStudents: 100,
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                updatedAt: new Date('2024-01-01T00:00:00.000Z'),
                disabled: false,
                disabledAt: null,
            };

            const mockClass = {
                id: 'class123',
                name: 'Math Class',
                teacher: {
                    id: 'teacher123',
                    name: 'John Doe',
                },
                teacherId: 'teacher123',
                schoolId: 'school123',
                students: [
                    { id: 'student1', name: 'Student 1' },
                    { id: 'student2', name: 'Student 2' },
                ],
                disabled: false,
                disabledAt: null,
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                updatedAt: new Date('2024-12-20T00:00:00.000Z'),
            };

            jest.spyOn(prismaService.school, 'findUnique').mockResolvedValue(mockSchool);
            jest.spyOn(prismaService.class, 'create').mockResolvedValue(mockClass);

            const result = await classesPrismaService.create(createClassDto);

            expect(result).toEqual({
                id: 'class123',
                name: 'Math Class',
                teacher: {
                    id: 'teacher123',
                    name: 'John Doe',
                },
                students: [
                    { id: 'student1', name: 'Student 1' },
                    { id: 'student2', name: 'Student 2' },
                ],
                disabled: false,
                disabledAt: undefined,
                createdAt: new Date('2024-01-01T00:00:00.000Z'),
                updatedAt: new Date('2024-12-20T00:00:00.000Z'),
            });

            expect(prismaService.school.findUnique).toHaveBeenCalledWith({
                where: { userId: 'user123' },
            });

            expect(prismaService.class.create).toHaveBeenCalledWith({
                data: {
                    name: 'Math Class',
                    teacher: { connect: { id: 'teacher123' } },
                    school: { connect: { id: 'school123' } },
                    disabled: false,
                },
                include: { teacher: true, students: true },
            });
        });
    });


    describe('findStudentsByClass', () => {
        it('should return students by class ID', async () => {
            const mockStudents = [
                {
                    id: 'student1',
                    name: 'Student 1',
                    classId: 'class123',
                    createdAt: new Date('2024-01-01T00:00:00.000Z'),
                    updatedAt: new Date('2024-12-20T00:00:00.000Z'),
                    disabled: false,
                    disabledAt: null,
                    schoolId: 'school123',
                    isFilled: true,
                    class: ClassType.BERCARIO,
                    categorie: CategorieType.PARCIAL,
                    turn: TurnType.MATUTINO,
                    dataNascimento: '2010-01-01',
                    naturalidadeAluno: 'São Paulo',
                    endereco: 'Rua Exemplo, 123',
                    cep: '12345-678',
                    mae: JSON.stringify({
                        nome: 'Maria Silva',
                        telefone: '111111111',
                    }),
                    pai: JSON.stringify({
                        nome: 'José Silva',
                        telefone: '222222222',
                    }),
                    responsaveis: JSON.stringify([
                        { nome: 'Ana', parentesco: 'Tia', telefone: '333333333' },
                    ]),
                    observacoes: JSON.stringify([{ titulo: 'Alergia', descricao: 'Amendoim' }]),
                    observacoesMedicas: JSON.stringify({
                        alergias: 'Amendoim',
                    }),
                    payments: [],
                },
                {
                    id: 'student2',
                    name: 'Student 2',
                    classId: 'class123',
                    createdAt: new Date('2024-01-01T00:00:00.000Z'),
                    updatedAt: new Date('2024-12-20T00:00:00.000Z'),
                    disabled: false,
                    disabledAt: null,
                    schoolId: 'school123',
                    isFilled: true,
                    class: ClassType.BERCARIO,
                    categorie: CategorieType.PARCIAL,
                    turn: TurnType.MATUTINO,
                    dataNascimento: '2010-01-01',
                    naturalidadeAluno: 'São Paulo',
                    endereco: 'Rua Exemplo, 123',
                    cep: '12345-678',
                    mae: JSON.stringify({
                        nome: 'Maria Silva',
                        telefone: '111111111',
                    }),
                    pai: JSON.stringify({
                        nome: 'José Silva',
                        telefone: '222222222',
                    }),
                    responsaveis: JSON.stringify([
                        { nome: 'Ana', parentesco: 'Tia', telefone: '333333333' },
                    ]),
                    observacoes: JSON.stringify([{ titulo: 'Alergia', descricao: 'Amendoim' }]),
                    observacoesMedicas: JSON.stringify({
                        alergias: 'Amendoim',
                    }),
                    payments: [],
                },
            ];

            jest.spyOn(prismaService.student, 'findMany').mockResolvedValue(mockStudents);

            const result = await classesPrismaService.findStudentsByClass('class123');

            expect(result).toEqual(mockStudents);
            expect(prismaService.student.findMany).toHaveBeenCalledWith({
                where: { classes: { some: { id: 'class123' } } },
            });
        });
    });
});
