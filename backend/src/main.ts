import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { Role } from './enums/role.enum';
import { User } from './user/user.entity';
import { BCRYPT_ROUNDS } from './constants/security.constants';

async function createAdminOnFirstUse() {
  const admin = await User.findOne({ where: { username: 'admin' } });

  if (!admin) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      throw new Error(
        '❌ ADMIN_PASSWORD environment variable is required. Set it in docker-compose.yml or .env file.'
      );
    }

    await User.create({
      firstName: 'admin',
      lastName: 'admin',
      isActive: true,
      username: 'admin',
      role: Role.Admin,
      password: await bcrypt.hash(adminPassword, BCRYPT_ROUNDS),
    }).save();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  app.use(helmet());
  
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Carna Project API')
    .setDescription('Carna Project API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await createAdminOnFirstUse();

  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
