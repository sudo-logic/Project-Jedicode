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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('questions')
@Public()
@ApiTags('Questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiResponse({ status: 201, description: 'The question has been successfully created.', type: Question })
  async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return await this.questionsService.create(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({ status: 200, description: 'Return all questions.', type: [Question] })
  async getQuestions() {
    return await this.questionsService.findAll();
  }

  @Get('random/:limit')
  @ApiOperation({ summary: 'Get random questions' })
  @ApiResponse({ status: 200, description: 'Return random questions.', type: [Question] })
  async getRandomQuestions(@Param('limit') limit: string) {
    return await this.questionsService.findRandom(parseInt(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a question by ID' })
  @ApiResponse({ status: 200, description: 'Return a question by ID.', type: Question })
  async getQuestionById(@Param('id') id: string) {
    return await this.questionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a question by ID' })
  @ApiResponse({ status: 200, description: 'The question has been successfully updated.', type: Question })
  async updateQuestion(
    @Param('id') id: string,
    @Body() question: CreateQuestionDto,
  ): Promise<Question> {
    return await this.questionsService.update(id, question);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question by ID' })
  @ApiResponse({ status: 200, description: 'The question has been successfully deleted.' })
  async deleteQuestion(@Param('id') id: string) {
    return await this.questionsService.remove(id);
  }
}
