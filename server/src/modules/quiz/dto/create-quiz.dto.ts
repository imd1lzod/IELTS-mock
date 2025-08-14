import { IsString, IsArray, ValidateNested, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateVariantDto {
  @ApiProperty({
    description: 'The text content of the variant',
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
}

export class CreateQuizDto {
  @ApiProperty({
    description: 'The text content of the quiz question',
    example: 'What is the capital of France?',
    type: String
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'Array of answer variants',
    type: [CreateVariantDto],
    example: [
      { text: 'Paris', isTrue: true },
      { text: 'London', isTrue: false },
      { text: 'Berlin', isTrue: false },
      { text: 'Madrid', isTrue: false }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants: CreateVariantDto[];
}
