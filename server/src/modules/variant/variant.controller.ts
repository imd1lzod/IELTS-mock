import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@ApiTags('Variant')
@Controller('variant')
export class VariantController {
  constructor(private variantService: VariantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new answer variant' })
  @ApiBody({ type: CreateVariantDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Answer variant created successfully',
    type: CreateVariantDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() dto: CreateVariantDto) {
    return await this.variantService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all answer variants' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all answer variants',
    type: [CreateVariantDto]
  })
  async getAll() {
    return await this.variantService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an answer variant by ID' })
  @ApiParam({ name: 'id', description: 'Answer variant ID', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Answer variant found',
    type: CreateVariantDto
  })
  @ApiResponse({ status: 404, description: 'Answer variant not found' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.variantService.getOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an answer variant' })
  @ApiParam({ name: 'id', description: 'Answer variant ID', type: Number })
  @ApiBody({ type: UpdateVariantDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Answer variant updated successfully',
    type: UpdateVariantDto
  })
  @ApiResponse({ status: 404, description: 'Answer variant not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVariantDto,
  ) {
    return await this.variantService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an answer variant' })
  @ApiParam({ name: 'id', description: 'Answer variant ID', type: Number })
  @ApiResponse({ status: 200, description: 'Answer variant deleted successfully' })
  @ApiResponse({ status: 404, description: 'Answer variant not found' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.variantService.delete(id);
  }
}
