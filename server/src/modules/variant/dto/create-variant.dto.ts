import { IsBoolean, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVariantDto {
  @ApiProperty({
    description: 'The text content of the answer variant',
    example: 'Paris',
    type: String
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Whether this variant is the correct answer',
    example: true,
    type: Boolean
  })
  @IsBoolean()
  isTrue: boolean;

  @ApiProperty({
    description: 'The ID of the quiz this variant belongs to',
    example: 1,
    type: Number
  })
  @IsInt()
  quizId: number;
}
