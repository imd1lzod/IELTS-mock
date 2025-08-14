import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { QuizService } from "./quiz.service";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { UpdateQuizDto } from "./dto/update-quiz.dto";

@ApiTags('Quiz')
@Controller("quiz")
export class QuizController {
        constructor(private quizService: QuizService) {}

        @Post()
        @ApiOperation({ summary: 'Create a new quiz question' })
        @ApiBody({ type: CreateQuizDto })
        @ApiResponse({ 
                status: 201, 
                description: 'Quiz question created successfully',
                type: CreateQuizDto
        })
        @ApiResponse({ status: 400, description: 'Bad request' })
        async create(@Body() dto: CreateQuizDto) {
                return await this.quizService.create(dto)
        }

        @Get()
        @ApiOperation({ summary: 'Get all quiz questions' })
        @ApiResponse({ 
                status: 200, 
                description: 'List of all quiz questions',
                type: [CreateQuizDto]
        })
        async getAll() {
                return await this.quizService.getAll()
        }

        @Get(':id')
        @ApiOperation({ summary: 'Get a quiz question by ID' })
        @ApiParam({ name: 'id', description: 'Quiz question ID', type: Number })
        @ApiResponse({ 
                status: 200, 
                description: 'Quiz question found',
                type: CreateQuizDto
        })
        @ApiResponse({ status: 404, description: 'Quiz question not found' })
        async getOne(@Param('id', ParseIntPipe) id: number) {
                return await this.quizService.getOne(id)
        }

        @Put(':id')
        @ApiOperation({ summary: 'Update a quiz question' })
        @ApiParam({ name: 'id', description: 'Quiz question ID', type: Number })
        @ApiBody({ type: UpdateQuizDto })
        @ApiResponse({ 
                status: 200, 
                description: 'Quiz question updated successfully',
                type: UpdateQuizDto
        })
        @ApiResponse({ status: 404, description: 'Quiz question not found' })
        async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateQuizDto) {
                return await this.quizService.update(id, dto)
        }

        @Delete(':id')
        @ApiOperation({ summary: 'Delete a quiz question' })
        @ApiParam({ name: 'id', description: 'Quiz question ID', type: Number })
        @ApiResponse({ status: 200, description: 'Quiz question deleted successfully' })
        @ApiResponse({ status: 404, description: 'Quiz question not found' })
        async delete(@Param('id', ParseIntPipe) id: number) {
                return await this.quizService.delete(id)
        }
}