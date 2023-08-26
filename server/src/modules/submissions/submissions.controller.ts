import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dtos/createSubmission.dto';
import { Submission } from './submissions.entity';
import { Public } from '../auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RunnerService } from '../runner/runner.service';
import { CodeRunnerDto } from '../runner/dto/code-runner.dto';

@Controller('submissions')
@ApiTags('Submissions')
export class SubmissionsController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly runnerService: RunnerService,
  ) {}

  @Post()
  async create(
    @Body() submission: CreateSubmissionDto,
    @Req() request,
  ): Promise<Submission> {
    const codeRunnerDto = new CodeRunnerDto();
    codeRunnerDto.code = submission.code;
    codeRunnerDto.language_id = submission.language_id;
    codeRunnerDto.question_id = submission.question_id;

    const result = await this.runnerService.run_code(codeRunnerDto);

    const user = request.user.sub;
    const total_cases = result.length;
    const passed_cases = result.filter((r) => r.status.id === 3).length;
    let score = (passed_cases / total_cases) * 10;
    score = Math.round(score);

    return await this.submissionsService.create(
      submission,
      score,
      user,
      result,
    );
  }

  @Get()
  async findAll(): Promise<Submission[]> {
    return await this.submissionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Submission> {
    return await this.submissionsService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Submission> {
    return await this.submissionsService.delete(id);
  }
}
