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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@ApiTags('Answer')
@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new answer' })
  @ApiBody({ type: CreateAnswerDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Answer created successfully',
    type: CreateAnswerDto
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() dto: CreateAnswerDto) {
    return await this.answerService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all answers' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of all answers',
    type: [CreateAnswerDto]
  })
  async getAll() {
    return await this.answerService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an answer by ID' })
  @ApiParam({ name: 'id', description: 'Answer ID', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Answer found',
    type: CreateAnswerDto
  })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.answerService.getOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an answer' })
  @ApiParam({ name: 'id', description: 'Answer ID', type: Number })
  @ApiBody({ type: UpdateAnswerDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Answer updated successfully',
    type: UpdateAnswerDto
  })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAnswerDto,
  ) {
    return await this.answerService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an answer' })
  @ApiParam({ name: 'id', description: 'Answer ID', type: Number })
  @ApiResponse({ status: 200, description: 'Answer deleted successfully' })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.answerService.delete(id);
  }
}
