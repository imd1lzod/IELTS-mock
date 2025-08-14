import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAnswerDto {
  @ApiProperty({
    description: 'The ID of the attempt this answer belongs to',
    example: 1,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsInt()
  attemptId?: number;

  @ApiProperty({
    description: 'The ID of the quiz this answer is for',
    example: 1,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsInt()
  quizId?: number;

  @ApiProperty({
    description: 'The ID of the selected answer variant',
    example: 1,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsInt()
  variantId?: number;
}
