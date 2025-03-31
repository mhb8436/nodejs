import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 전역 파이프 설정
  app.useGlobalPipes(new ValidationPipe());

  // CORS 설정
  app.enableCors();

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle("게시판 API")
    .setDescription("게시판 애플리케이션의 API 문서")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(3000);
}
bootstrap();
