import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormconfig } from './orm.config';
import { UsersModule } from './users/users.module';
// const ormconfig = require('./orm.config')
require('dotenv').config({
  path: `./${process.env.NODE_ENV}.env`
})

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
