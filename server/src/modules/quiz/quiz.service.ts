import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateQuizDto } from "./dto/create-quiz.dto";
import { UpdateQuizDto } from "./dto/update-quiz.dto";

@Injectable()
export class QuizService {
        constructor(private prisma: PrismaService) {}

        async create(dto: CreateQuizDto) {
                const quiz = await this.prisma.quiz.findFirst({where: {text: dto.text}})

                if(quiz) {
                        throw new ConflictException("Quiz is already created!")
                }

                const result = await this.prisma.$transaction(async (prisma) => {
                        const createdQuiz = await prisma.quiz.create({
                                data: {
                                        text: dto.text
                                }
                        });

                        const variants = await Promise.all(
                                dto.variants.map(variant => 
                                        prisma.variant.create({
                                                data: {
                                                        text: variant.text,
                                                        isTrue: variant.isTrue,
                                                        quizId: createdQuiz.id
                                                }
                                        })
                                )
                        );

                        return {
                                quiz: createdQuiz,
                                variants: variants
                        };
                });

                return {
                        message: "Quiz created successfully!",
                        data: result
                }
        }

        async getAll() {
                const quizes = await this.prisma.quiz.findMany({
                        include: {
                                variants: true
                        }
                });

                return {
                        data: quizes
                }
        }

        async getOne(id: number) {
                const quiz = await this.prisma.quiz.findUnique({
                        where: { id: id },
                        include: {
                                variants: true
                        }
                });

                if (!quiz) {
                        throw new NotFoundException("Quiz not found");
                }

                return {
                        data: quiz
                }
        }

        async update(id: number, dto: UpdateQuizDto) {
                await this.#findQuiz(id)

                const updatedQuiz = await this.prisma.quiz.update({data: dto, where: {id: id}})

                return {
                        message: "Quiz updated succesfully!",
                        data: updatedQuiz
                }
        }

        async delete(id: number) {
                await this.#findQuiz(id)

                await this.prisma.quiz.delete({where: {id: id}})

                return {
                        message: "Quiz deleted successfully!"
                }
        }

        async #findQuiz(id: number) {
                const quiz = await this.prisma.quiz.findUnique({where: {id: id}})

                if(!quiz) {
                        throw new NotFoundException("Quiz not found")
                }

                return quiz
        }
}