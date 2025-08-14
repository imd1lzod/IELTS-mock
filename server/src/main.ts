import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: false,
    forbidNonWhitelisted: false,
  }));

  const config = new DocumentBuilder()
    .setTitle('IELTS Mock Test API')
    .setDescription('API for managing IELTS mock test questions, variants, attempts, and answers')
    .setVersion('1.0')
    .addTag('Quiz', 'Quiz question management')
    .addTag('Variant', 'Answer variant management')
    .addTag('Attempt', 'Test attempt management')
    .addTag('Answer', 'User answer management')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
