import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateStudentDto } from './dtos/CreateStudent.dto';
import { StudentResponseDto } from './dtos/StudentResponse.dto';

@Injectable()
export class StudentsPrismaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentDto): Promise<StudentResponseDto> {
    const student = await this.prisma.student.create({
      data: {
        ...data,
        mae: data.mae ? JSON.stringify(data.mae) : undefined,
        pai: data.pai ? JSON.stringify(data.pai) : undefined,
        responsaveis: data.responsaveis ? JSON.stringify(data.responsaveis) : undefined,
        observacoes: data.observacoes ? JSON.stringify(data.observacoes) : undefined,
        observacoesMedicas: data.observacoesMedicas ? JSON.stringify(data.observacoesMedicas) : undefined,
      },
    });
  
    return this.mapToStudentResponseDto(student);
  }
  

  private mapToStudentResponseDto(student: any): StudentResponseDto {
    return {
      id: student.id,
      name: student.name,
      isFilled: student.isFilled,
      categorie: student.categorie,
      class: student.class,
      turn: student.turn,
      dataNascimento: student.dataNascimento,
      naturalidadeAluno: student.naturalidadeAluno,
      endereco: student.endereco,
      cep: student.cep,
      mae: student.mae ? JSON.parse(student.mae) : undefined,
      pai: student.pai ? JSON.parse(student.pai) : undefined,
      responsaveis: student.responsaveis ? JSON.parse(student.responsaveis) : undefined,
      observacoes: student.observacoes ? JSON.parse(student.observacoes) : undefined,
      observacoesMedicas: student.observacoesMedicas ? JSON.parse(student.observacoesMedicas) : undefined,
      disabled: student.disabled,
      disabledAt: student.disabledAt,
    };
  }
  

  async findAll(): Promise<StudentResponseDto[]> {
    const students = await this.prisma.student.findMany({
      orderBy: [{ name: 'asc' }],
    });
  
    // Mapeie os resultados para o tipo StudentResponseDto
    return students.map(student => this.mapToStudentResponseDto(student));
  }
  

  async get(studentId: string): Promise<StudentResponseDto> {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });
  
    if (!student) {
      throw new Error('Student not found');
    }
  
    return this.mapToStudentResponseDto(student);
  }
  
  async update(input: { data: CreateStudentDto; studentId: string }): Promise<StudentResponseDto> {
    const { data, studentId } = input;
    const updatedStudent = await this.prisma.student.update({
      where: { id: studentId },
      data: {
        name: data.name,
        isFilled: data.isFilled,
        categorie: data.categorie,
        class: data.class,
        turn: data.turn,
        dataNascimento: data.dataNascimento,
        naturalidadeAluno: data.naturalidadeAluno,
        endereco: data.endereco,
        cep: data.cep,
        mae: data.mae ? JSON.stringify(data.mae) : undefined,
        pai: data.pai ? JSON.stringify(data.pai) : undefined,
        responsaveis: data.responsaveis ? JSON.stringify(data.responsaveis) : undefined,
        observacoes: data.observacoes ? JSON.stringify(data.observacoes) : undefined,
        observacoesMedicas: data.observacoesMedicas ? JSON.stringify(data.observacoesMedicas) : undefined,
      },
    });
  
    return this.mapToStudentResponseDto(updatedStudent);
  }
  
  
  

  async disable(studentId: string): Promise<StudentResponseDto> {
    const student = await this.prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        disabled: true,
        disabledAt: new Date(),
      },
    });
  
    return this.mapToStudentResponseDto(student);
  }
  
}
