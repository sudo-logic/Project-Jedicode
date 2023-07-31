import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {ChatGateway} from './chat.gateway';
import {ormconfig} from './orm.config';
import {QuestionsController} from './questions/questions.controller';
import {QuestionsModule} from './questions/questions.module';
import {SubmissionsModule} from './submissions/submissions.module';
import {UsersModule} from './users/users.module';

// const ormconfig = require('./orm.config')
require('dotenv').config({
  path : `./${process.env.NODE_ENV}.env`,
});

@Module({
  imports : [
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    AuthModule,
    QuestionsModule,
    SubmissionsModule,
  ],
  controllers : [ AppController, QuestionsController ],
  providers : [ AppService, ChatGateway ],
})
export class AppModule {
}
