import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './submissions.entity';
import { CreateSubmissionDto } from './dtos/createSubmission.dto';
@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(Submission)
    private submissionsRepository: Repository<Submission>,
  ) {}

  async findAll(): Promise<Submission[]> {
    const submissions = await this.submissionsRepository.find();
    return submissions;
  }

  async findOne(id: string): Promise<Submission> {
    return await this.submissionsRepository.findOneBy({ id });
  }

  async create(submission: CreateSubmissionDto): Promise<Submission> {
    const newSubmission = this.submissionsRepository.create(submission);
    return await this.submissionsRepository.save(newSubmission);
  }

  async update(
    id: string,
    submission: CreateSubmissionDto,
  ): Promise<Submission> {
    await this.submissionsRepository.update(id, submission);
    return await this.submissionsRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<Submission> {
    const submission = await this.submissionsRepository.findOne({
      where: { id: id },
    });
    await this.submissionsRepository.delete(id);
    return submission;
  }
}
