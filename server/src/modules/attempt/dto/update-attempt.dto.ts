import { IsInt, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttemptDto {
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

  @ApiProperty({
    description: 'The timestamp when the attempt was submitted',
    example: '2024-01-15T10:30:00Z',
    type: String,
    required: false
  })
  @IsOptional()
  @IsDateString()
  submittedAt?: Date;
}
