import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Inicie Educação')
    .setDescription('Somos os melhores parceiros para apoiar sua instituição a promover uma jornada de experiências e tecnologia para impactar a aprendizagem de seus colaboradores, alunos e comunidade com inovação. Da educação básica ao ensino corporativo.')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://localhost:3000`)

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const redocOptions: RedocOptions = {
    title: 'Inicie Educação',
    logo: {
      url: 'https://inicie.digital/wp-content/uploads/2022/03/inicie_logo-03-2048x830.png',
      backgroundColor: '#F0F0F0',
      altText: 'Inicie logo'
    },
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
    // auth: {
    //   enabled: true,
    //   user: 'admin',
    //   password: '123'
    // },
    tagGroups: [
      {
        name: 'Auth',
        tags: ['Auth'],
      },
      {
        name: 'User',
        tags: ['User'],
      },
      {
        name: 'Post',
        tags: ['Post'],
      },
      {
        name: 'Comment',
        tags: ['Comment'],
      },
    ],
  };
  await RedocModule.setup('/docs', app, document, redocOptions);

  await app.listen(3000);
}
bootstrap();
