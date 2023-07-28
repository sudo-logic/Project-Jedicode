import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async findAll(): Promise<Question[]> {
    return await this.questionsRepository.find();
  }

  async findOne(id: string): Promise<Question> | undefined {
    return await this.questionsRepository.findOne({ where: { id } });
  }
}
