import { Body, Controller, Get, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Public } from 'src/auth/public.decorator';

@Controller('questions')
@Public()
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get(':id')
  getQuestionById(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Get()
  getQuestions() {
    return this.questionsService.findAll();
  }
}
