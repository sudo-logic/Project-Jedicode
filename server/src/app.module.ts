import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormconfig } from './orm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsModule } from './questions/questions.module';
import { SubmissionsModule } from './submissions/submissions.module';
// const ormconfig = require('./orm.config')
require('dotenv').config({
  path: `./${process.env.NODE_ENV}.env`,
});

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, AuthModule, QuestionsModule, SubmissionsModule],
  controllers: [AppController, QuestionsController],
  providers: [AppService],
})
export class AppModule {}
