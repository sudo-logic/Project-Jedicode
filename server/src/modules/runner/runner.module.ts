import { Module } from '@nestjs/common';
import { RunnerController } from './runner.controller';
import { QuestionsModule } from '../questions/questions.module';
import { RunnerService } from './runner.service';

@Module({
  controllers: [RunnerController],
  imports: [QuestionsModule],
  providers: [RunnerService],
  exports: [RunnerService],
})
export class RunnerModule {}
