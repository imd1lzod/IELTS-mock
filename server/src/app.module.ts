import { Module } from '@nestjs/common';
import { QuizModule } from './modules/quiz/quiz.module';
import { AnswerModule } from './modules/answer/answer.module';
import { VariantModule } from './modules/variant/variant.module';
import { AttemptModule } from './modules/attempt/attempt.module';

@Module({
  imports: [
    QuizModule,
    VariantModule,
    AttemptModule,
    AnswerModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
