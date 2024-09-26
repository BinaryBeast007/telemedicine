import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as crypto from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    session({
      secret: crypto.randomBytes(64).toString('hex'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 300000, 
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
