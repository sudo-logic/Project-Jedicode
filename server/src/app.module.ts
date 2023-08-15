import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// const ormconfig = require('./orm.config')
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from './modules/auth/auth.module';
import { QuestionsController } from './modules/questions/questions.controller';
import { QuestionsModule } from './modules/questions/questions.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';
import { UsersModule } from './modules/users/users.module';
import { ormconfig } from './orm.config';
import { RunnerController } from './modules/runner/runner.controller';
import { RunnerModule } from './modules/runner/runner.module';
import { RoomsModule } from './modules/rooms/rooms.module';

dotenv.config({
  path: `./${process.env.NODE_ENV}.env`,
});

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    AuthModule,
    QuestionsModule,
    SubmissionsModule,
    RunnerModule,
    RoomsModule,
  ],
  controllers: [AppController, QuestionsController, RunnerController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
