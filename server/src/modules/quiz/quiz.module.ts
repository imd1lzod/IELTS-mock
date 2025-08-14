import { Module } from "@nestjs/common";
import { QuizService } from "./quiz.service";
import { PrismaService } from "src/prisma/prisma.service";
import { QuizController } from "./quiz.controller";

@Module({
        imports: [],
        controllers: [QuizController],
        providers: [QuizService, PrismaService]
})

export class QuizModule {}