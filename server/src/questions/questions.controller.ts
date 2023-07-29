import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Public } from 'src/auth/public.decorator';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
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

  @Post()
  createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.create(createQuestionDto);
  }

  @Delete(':id')
  deleteQuestion(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }

  @Put(':id')
  updateQuestion(
    @Param('id') id: string,
    @Body() question: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionsService.update(id, question);
  }
}
