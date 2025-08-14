import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'The ID of the attempt this answer belongs to',
    example: 1,
    type: Number
  })
  @IsInt()
  attemptId: number;

  @ApiProperty({
    description: 'The ID of the quiz this answer is for',
    example: 1,
    type: Number
  })
  @IsInt()
  quizId: number;

  @ApiProperty({
    description: 'The ID of the selected answer variant',
    example: 1,
    type: Number
  })
  @IsInt()
  variantId: number;
}
