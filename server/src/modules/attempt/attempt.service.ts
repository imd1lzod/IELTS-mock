import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

@Injectable()
export class AttemptService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAttemptDto) {
    const createdAttempt = await this.prisma.attempt.create({
      data: dto,
    });

    return {
      message: 'Attempt created successfully!',
      data: createdAttempt,
    };
  }

  async getAll() {
    const attempts = await this.prisma.attempt.findMany();
    return { data: attempts };
  }

  async getOne(id: number) {
    const attempt = await this.findAttempt(id);
    return { data: attempt };
  }

  async update(id: number, dto: UpdateAttemptDto) {
    await this.findAttempt(id);

    const updatedAttempt = await this.prisma.attempt.update({
      where: { id },
      data: dto,
    });

    return {
      message: 'Attempt updated successfully!',
      data: updatedAttempt,
    };
  }

  async delete(id: number) {
    await this.findAttempt(id);
    await this.prisma.attempt.delete({ where: { id } });

    return { message: 'Attempt deleted successfully!' };
  }

  private async findAttempt(id: number) {
    const attempt = await this.prisma.attempt.findUnique({ where: { id } });

    if (!attempt) {
      throw new NotFoundException('Attempt not found');
    }

    return attempt;
  }
}
