import { ApiProperty } from '@nestjs/swagger';
import { StudentDisabledResponseDto, StudentResponseDto } from './StudentResponse.dto';

export class SuccessCreateResponseDto {
  @ApiProperty({ example: 'Student created successfully' })
  message: string;

  @ApiProperty({ type: StudentResponseDto })
  data: StudentResponseDto;
}

export class SuccessUpdateResponseDto {
  @ApiProperty({ example: 'Student updated successfully' })
  message: string;

  @ApiProperty({ type: StudentResponseDto })
  data: StudentResponseDto;
}

export class SuccessDisableResponseDto {
  @ApiProperty({ example: 'Student deleted successfully' })
  message: string;

  @ApiProperty({ type: StudentDisabledResponseDto })
  data: StudentDisabledResponseDto;
}
