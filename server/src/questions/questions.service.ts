import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async create(question: CreateQuestionDto): Promise<Question> {
    const newQuestion = this.questionsRepository.create(question);
    return await this.questionsRepository.save(newQuestion);
  }

  async findAll(): Promise<Question[]> {
    const questions = await this.questionsRepository.find();
    return questions;
  }

  async findOne(id: string): Promise<Question> | undefined {
    const question = await this.questionsRepository.findOne({ where: { id } });
    return question;
  }

  async remove(id: string): Promise<void> {
    await this.questionsRepository.delete(id);
  }

  async update(id: string, question: CreateQuestionDto): Promise<Question> {
    await this.questionsRepository.update(id, question);
    const updatedQuestion = await this.questionsRepository.findOne({
      where: { id },
    });
    return updatedQuestion;
  }
}
