import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './common/Pipes/CustomValidationPipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from './config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

import { QueryFailedFilter } from './common/exceptions/query-failed-exception.filter';
import { DatabaseConnectionExceptionFilter } from './common/exceptions/database-connection-exception.filter.ts';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { PublicationsModule } from './publications/publications.module';
import { Publication } from './publications/entities/publication.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DB_HOST,
      port: Number(envs.DB_PORT),
      username: envs.DB_USER,
      password: envs.DB_PASS,
      database: envs.DB_NAME,
      entities: [User, Product, Publication],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    PublicationsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe
    }, 
    {
      provide: APP_FILTER,
      useClass: DatabaseConnectionExceptionFilter,
    }, 
    {
      provide: APP_FILTER,
      useClass: QueryFailedFilter,
    }, 
    
  ],
})
export class AppModule { }
