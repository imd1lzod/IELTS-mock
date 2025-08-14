import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuizDto {
  @ApiProperty({
    description: 'The text content of the quiz question',
    example: 'What is the capital of France?',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  text?: string;
}
