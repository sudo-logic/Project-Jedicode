import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dtos/createSubmission.dto';
import { Submission } from './submissions.entity';
import { Public } from '../auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('submissions')
@Public()
@ApiTags('Submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  async create(@Body() submission: CreateSubmissionDto): Promise<Submission> {
    return await this.submissionsService.create(submission);
  }

  @Get()
  async findAll(): Promise<Submission[]> {
    return await this.submissionsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Submission> {
    return await this.submissionsService.delete(id);
  }
}
