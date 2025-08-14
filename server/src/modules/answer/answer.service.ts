import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAnswerDto) {
    const createdAnswer = await this.prisma.answer.create({
      data: dto,
    });

    return {
      message: 'Answer created successfully!',
      data: createdAnswer,
    };
  }

  async getAll() {
    const answers = await this.prisma.answer.findMany({
      include: {
        attempt: true,
        quiz: true,
        variant: true,
      },
    });
    return { data: answers };
  }

  async getOne(id: number) {
    const answer = await this.findAnswer(id);
    return { data: answer };
  }

  async update(id: number, dto: UpdateAnswerDto) {
    await this.findAnswer(id);

    const updatedAnswer = await this.prisma.answer.update({
      where: { id },
      data: dto,
    });

    return {
      message: 'Answer updated successfully!',
      data: updatedAnswer,
    };
  }

  async delete(id: number) {
    await this.findAnswer(id);
    await this.prisma.answer.delete({ where: { id } });

    return { message: 'Answer deleted successfully!' };
  }

  private async findAnswer(id: number) {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
      include: {
        attempt: true,
        quiz: true,
        variant: true,
      },
    });

    if (!answer) {
      throw new NotFoundException('Answer not found');
    }

    return answer;
  }
}
