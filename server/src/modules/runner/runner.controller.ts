import { Controller, Get, Post, Body } from '@nestjs/common';
import axios from 'axios';
import { CodeRunnerDto } from './dto/code-runner.dto';
import { QuestionsService } from '../questions/questions.service';
import { TestCase } from '../shared/test-case.interface';
import { Public } from '../auth/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('runner')
@ApiTags('Runner')
@Public()
export class RunnerController {
  constructor(private readonly questionService: QuestionsService) {}

  @Post()
  async runCode(@Body() CodeRunnerDto: CodeRunnerDto) {
    // get question from database, and get the test cases
    const question = await this.questionService.findOne(
      CodeRunnerDto.question_id,
    );
    const testCases = question.test_cases;

    // run the code against the test cases

    const results = [];
    for (const testCase of testCases) {
      const result = await this.submit_and_wait(CodeRunnerDto, testCase);
      results.push(result);
    }

    // const tokens = [];
    // for (const testCase of testCases) {
    //   const result = await this.submit_code_for_run(CodeRunnerDto, testCase);
    //   tokens.push(result);
    // }

    // // get the results of the test cases
    // const results = [];

    // for (const token of tokens) {
    //   const result = await this.get_result(token.token);
    //   results.push(result);
    // }

    // return the results
    return results;
  }

  async submit_and_wait(codeRunnerDTO: CodeRunnerDto, testCase: TestCase) {
    const response = await axios.post(
      'http://34.100.255.183:2358/submissions/?wait=true',
      {
        source_code: codeRunnerDTO.sourceCode,
        language_id: codeRunnerDTO.language_id,
        number_of_runs: null,
        stdin: testCase.input,
        expected_output: testCase.output,
        cpu_time_limit: null,
        cpu_extra_time: null,
        wall_time_limit: null,
        memory_limit: null,
        stack_limit: null,
        max_processes_and_or_threads: null,
        enable_per_process_and_thread_time_limit: null,
        enable_per_process_and_thread_memory_limit: null,
        max_file_size: null,
        enable_network: null,
      },
    );
    return response.data;
  }

  //   async submit_code_for_run(codeRunnerDTO: CodeRunnerDto, testCase: TestCase) {
  //     const response = await axios.post(
  //       'http://34.100.255.183:2358/submissions',
  //       {
  //         source_code: codeRunnerDTO.sourceCode,
  //         language_id: codeRunnerDTO.language_id,
  //         number_of_runs: null,
  //         stdin: 'Judge0',
  //         expected_output: null,
  //         cpu_time_limit: null,
  //         cpu_extra_time: null,
  //         wall_time_limit: null,
  //         memory_limit: null,
  //         stack_limit: null,
  //         max_processes_and_or_threads: null,
  //         enable_per_process_and_thread_time_limit: null,
  //         enable_per_process_and_thread_memory_limit: null,
  //         max_file_size: null,
  //         enable_network: null,
  //       },
  //     );
  //     return response.data;
  //   }

  //   async get_result(token: string) {
  //     const response = await axios.get(
  //       `http://34.100.255.183:2358/submissions/${token}`,
  //     );
  //     return response.data;
  //   }
}
