import { Controller, Delete, Param, Put } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dtos/createSubmission.dto';
import { Get, Post, Body } from '@nestjs/common';
import { Submission } from './submissions.entity';
import { Public } from 'src/auth/public.decorator';

@Controller('submissions')
@Public()
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  async findAll(): Promise<Submission[]> {
    return await this.submissionsService.findAll();
  }

  @Post()
  async create(@Body() submission: CreateSubmissionDto): Promise<Submission> {
    return await this.submissionsService.create(submission);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() submission: CreateSubmissionDto,
  ): Promise<Submission> {
    return await this.submissionsService.update(id, submission);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Submission> {
    return await this.submissionsService.delete(id);
  }
}
