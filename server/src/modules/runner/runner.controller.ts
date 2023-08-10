import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RunnerService } from './runner.service';
import { CodeRunnerDto } from './dto/code-runner.dto';

@Controller('runner')
@ApiTags('Runner')
@Public()
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) {}

  @Post()
  async runCode(@Body() codeRunnerDto: CodeRunnerDto) {
    const results = await this.runnerService.run_code(codeRunnerDto);
    return results;
  }
}
