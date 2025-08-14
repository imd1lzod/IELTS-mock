import { IsInt, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttemptDto {
  @ApiProperty({
    description: 'The score achieved in the attempt',
    example: 85,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsInt()
  score?: number;

  @ApiProperty({
    description: 'The duration of the attempt in minutes',
    example: 45,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsInt()
  duration?: number;

  @ApiProperty({
    description: 'The percentage score achieved in the attempt',
    example: 85.5,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsNumber()
  percentage?: number;
}
