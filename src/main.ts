import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
//hehexd
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add validation pipe
  app.useGlobalPipes(new ValidationPipe());
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Encuentra Comparables API')
    .setDescription('TORTY QLERO')
    .setVersion('1.0')
    .addTag('encuentra_comparables')
    .addServer('/encuentra_comparables')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  await app.listen(3000);
}
bootstrap();
