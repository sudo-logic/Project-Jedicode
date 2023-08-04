import { Module } from '@nestjs/common';
import { RunnerController } from './runner.controller';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  controllers: [RunnerController],
  imports: [QuestionsModule],
})
export class RunnerModule {}
