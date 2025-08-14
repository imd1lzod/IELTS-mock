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
import { AttemptService } from './attempt.service';
import { CreateAttemptDto } from './dto/create-attempt.dto';
import { UpdateAttemptDto } from './dto/update-attempt.dto';

@ApiTags('Attempt')
@Controller('attempt')
export class AttemptController {
  constructor(private attemptService: AttemptService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new attempt' })
  @ApiBody({ type: CreateAttemptDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Attempt created successfully',
    type: CreateAttemptDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() dto: CreateAttemptDto) {
    return await this.attemptService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all attempts' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all attempts',
    type: [CreateAttemptDto]
  })
  async getAll() {
    return await this.attemptService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an attempt by ID' })
  @ApiParam({ name: 'id', description: 'Attempt ID', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Attempt found',
    type: CreateAttemptDto
  })
  @ApiResponse({ status: 404, description: 'Attempt not found' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.attemptService.getOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an attempt' })
  @ApiParam({ name: 'id', description: 'Attempt ID', type: Number })
  @ApiBody({ type: UpdateAttemptDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Attempt updated successfully',
    type: UpdateAttemptDto
  })
  @ApiResponse({ status: 404, description: 'Attempt not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAttemptDto,
  ) {
    return await this.attemptService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an attempt' })
  @ApiParam({ name: 'id', description: 'Attempt ID', type: Number })
  @ApiResponse({ status: 200, description: 'Attempt deleted successfully' })
  @ApiResponse({ status: 404, description: 'Attempt not found' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.attemptService.delete(id);
  }
}
