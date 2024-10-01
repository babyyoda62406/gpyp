import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './common/Pipes/CustomValidationPipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: Number(envs.DB_PORT),
      username: envs.DB_USER,
      password: envs.DB_PASS,
      database: envs.DB_NAME,
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    }
  ],
})
export class AppModule { }
