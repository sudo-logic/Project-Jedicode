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
import { Question } from './question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Public } from '../auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('questions')
@Public()
@ApiTags('Questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post()
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return await this.questionsService.create(createQuestionDto);
  }

  @Get()
  async getQuestions() {
    return await this.questionsService.findAll();
  }

  @Get('random/:limit')
  async getRandomQuestions(@Param('limit') limit: string) {
    return await this.questionsService.findRandom(parseInt(limit));
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    return await this.questionsService.findOne(id);
  }

  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() question: CreateQuestionDto,
  ): Promise<Question> {
    return await this.questionsService.update(id, question);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    return await this.questionsService.remove(id);
  }
}
