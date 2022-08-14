import { TransformInterceptor } from './middleware/transform.interceptor';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigRepoService } from './config/config.repo.service';
import * as basicAuth from 'express-basic-auth';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configRepoService = app.get(ConfigRepoService)
  const port = configRepoService.getServerPort()
  const swaggerPass = configRepoService.getSwaggerPassword();
  // app.enableCors({
  //   origin: true,
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  // });
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Hotel Admin Api')
    .addServer('http://localhost:5000')
    .setDescription('Hotel Admin Api')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    )
    .setExternalDoc('http://localhost:5000/api-doc-json','/api-docs-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // fs.writeFileSync('./api-docs.json', JSON.stringify(document));

  app.use('/api-docs', basicAuth({
    challenge: true,
    users: { thu: `${swaggerPass}` },
  }))

  SwaggerModule.setup('/api-docs', app, document, {
    customSiteTitle: 'Hotel Admin Api',
    customfavIcon: '',
  })

  app.listen(port, () => Logger.log(`Server listen on port ${port}`));
}
bootstrap();
