import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVariantDto {
  @ApiProperty({
    description: 'The text content of the answer variant',
    example: 'Paris',
    type: String,
    required: false
  })
  @IsOptional()
  @IsString()
  text?: string;

  @ApiProperty({
    description: 'Whether this variant is the correct answer',
    example: true,
    type: Boolean,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isTrue?: boolean;

  @ApiProperty({
    description: 'The ID of the quiz this variant belongs to',
    example: 1,
    type: Number,
    required: false
  })
  @IsOptional()
  @IsInt()
  quizId?: number;
}
