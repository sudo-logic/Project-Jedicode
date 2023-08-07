import { Controller, Post, Body } from '@nestjs/common';
import { QuestionsService } from '../questions/questions.service';
import { Public } from '../auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RunnerService } from './runner.service';
import { CodeRunnerDto } from './dto/code-runner.dto';

@Controller('runner')
@ApiTags('Runner')
@Public()
export class RunnerController {
  constructor(
    private readonly questionService: QuestionsService,
    private readonly runnerService: RunnerService,
  ) {}

  @Post()
  async runCode(@Body() codeRunnerDto: CodeRunnerDto) {
    const question = await this.questionService.findOne(
      codeRunnerDto.question_id,
    );
    const testCases = question.test_cases;

    const results = [];
    for (const testCase of testCases) {
      const result = await this.runnerService.submit_and_wait(
        codeRunnerDto,
        testCase,
      );
      results.push(result);
    }

    return results;
  }
}
