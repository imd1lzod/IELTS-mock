import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVariantDto) {
    const existing = await this.prisma.variant.findFirst({
      where: { text: dto.text, quizId: dto.quizId },
    });

    if (existing) {
      throw new ConflictException('Variant is already created for this quiz!');
    }

    const createdVariant = await this.prisma.variant.create({ data: dto });

    return {
      message: 'Variant created successfully!',
      data: createdVariant,
    };
  }

  async getAll() {
    const variants = await this.prisma.variant.findMany();

    return { data: variants };
  }

  async getOne(id: number) {
    const variant = await this.findVariant(id);
    return { data: variant };
  }

  async update(id: number, dto: UpdateVariantDto) {
    await this.findVariant(id);

    const updatedVariant = await this.prisma.variant.update({
      where: { id },
      data: dto,
    });

    return {
      message: 'Variant updated successfully!',
      data: updatedVariant,
    };
  }

  async delete(id: number) {
    await this.findVariant(id);

    await this.prisma.variant.delete({ where: { id } });

    return { message: 'Variant deleted successfully!' };
  }

  private async findVariant(id: number) {
    const variant = await this.prisma.variant.findUnique({ where: { id } });

    if (!variant) {
      throw new NotFoundException('Variant not found');
    }

    return variant;
  }
}
