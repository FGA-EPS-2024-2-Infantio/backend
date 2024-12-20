import { Test, TestingModule } from '@nestjs/testing';
import { StudentsPrismaService } from '../student.prisma';
import { PrismaService } from '../../database/prisma.service';
import { CreateStudentDto } from '../dtos/CreateStudent.dto';
import { CategorieType, ClassType, TurnType } from '@prisma/client';

function createMockEntity(base: any, overrides = {}): any {
    return { ...base, ...overrides };
}

const baseStudent = {
    id: 'student123',
    name: 'John Doe',
    isFilled: true,
    categorie: CategorieType.PARCIAL,
    class: ClassType.BERCARIO,
    turn: TurnType.MATUTINO,
    dataNascimento: '2010-01-01',
    naturalidadeAluno: 'São Paulo',
    endereco: 'Rua Exemplo, 123',
    cep: '12345-678',
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
    disabled: false,
    disabledAt: null,
    payments: [],
    schoolId: 'school123',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-12-20T00:00:00.000Z'),
};

const baseSchool = {
    id: 'school123',
    name: 'Example School',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-12-20T00:00:00.000Z'),
    disabled: false,
    disabledAt: null,
    directorEmail: 'director@example.com',
    userId: 'user123',
    numberStudents: 100,
};

async function setupTestingModule(): Promise<TestingModule> {
    return Test.createTestingModule({
        providers: [
            StudentsPrismaService,
            {
                provide: PrismaService,
                useValue: {
                    student: {
                        create: jest.fn(),
                        findMany: jest.fn(),
                        findUnique: jest.fn(),
                        update: jest.fn(),
                    },
                    school: {
                        findUnique: jest.fn(),
                    },
                },
            },
        ],
    }).compile();
}

describe('StudentsPrismaService', () => {
    let studentsPrismaService: StudentsPrismaService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module = await setupTestingModule();
        studentsPrismaService = module.get<StudentsPrismaService>(StudentsPrismaService);
        prismaService = module.get<PrismaService>(PrismaService);

        jest.spyOn(prismaService.school, 'findUnique').mockResolvedValue(createMockEntity(baseSchool));
        jest.spyOn(prismaService.student, 'create').mockResolvedValue(createMockEntity(baseStudent));
    });

    describe('create', () => {
        it('should create a student', async () => {
            const createStudentDto: CreateStudentDto = {
                name: 'John Doe',
                categorie: CategorieType.PARCIAL,
                class: ClassType.BERCARIO,
                turn: TurnType.MATUTINO,
                userId: 'user123',
                dataNascimento: '2010-01-01',
                naturalidadeAluno: 'São Paulo',
                endereco: 'Rua Exemplo, 123',
                cep: '12345-678',
                mae: {
                    nome: 'Maria Silva',
                    telefone: '111111111',
                    cpf: '12345678901',
                    rg: '1234567',
                    naturalidade: 'São Paulo',
                },
                pai: {
                    nome: 'José Silva',
                    telefone: '222222222',
                    cpf: '98765432100',
                    rg: '7654321',
                    naturalidade: 'Rio de Janeiro',
                },
                responsaveis: [
                    { nome: 'Ana', parentesco: 'Tia', telefone: '333333333' },
                ],
                observacoes: [
                    { titulo: 'Alergia', descricao: 'Amendoim' },
                ],
                observacoesMedicas: {
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
                },
            };

            const result = await studentsPrismaService.create(createStudentDto);

            expect(result).toEqual(
                expect.objectContaining({
                    id: 'student123',
                    name: 'John Doe',
                    isFilled: true,
                    categorie: CategorieType.PARCIAL,
                    class: ClassType.BERCARIO,
                    turn: TurnType.MATUTINO,
                    dataNascimento: '2010-01-01',
                    naturalidadeAluno: 'São Paulo',
                    endereco: 'Rua Exemplo, 123',
                    cep: '12345-678',
                })
            );
        });
    });

    describe('findAll', () => {
        it('should return all students for a given userId', async () => {
            jest.spyOn(prismaService.student, 'findMany').mockResolvedValue([createMockEntity(baseStudent)]);

            const result = await studentsPrismaService.findAll({ userId: 'user123' });

            expect(result).toHaveLength(1);
            expect(result[0]).toHaveProperty('id', 'student123');
            expect(prismaService.student.findMany).toHaveBeenCalledWith({
                relationLoadStrategy: 'join',
                where: { school: { userId: 'user123' } },
                include: { payments: true },
                orderBy: [{ name: 'asc' }],
            });
        });
    });

    describe('get', () => {
        it('should return a student by ID', async () => {
            jest.spyOn(prismaService.student, 'findUnique').mockResolvedValue(createMockEntity(baseStudent));

            const result = await studentsPrismaService.get('student123');

            expect(result).toHaveProperty('id', 'student123');
            expect(prismaService.student.findUnique).toHaveBeenCalledWith({
                relationLoadStrategy: 'join',
                include: { payments: true },
                where: { id: 'student123' },
            });
        });
    });
});
