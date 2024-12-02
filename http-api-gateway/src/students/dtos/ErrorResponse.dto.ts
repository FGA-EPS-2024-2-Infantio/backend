import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'categorie must be one of the following values: PARCIAL, INTEGRAL' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class NotFoundErrorResponseDto {
  @ApiProperty({ example: 404 })
  statusCode: number;
  
  @ApiProperty({ example: 'Student not found' })
  message: string;
}
