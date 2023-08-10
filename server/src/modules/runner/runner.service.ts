import { Injectable } from '@nestjs/common';
import { CodeRunnerDto } from './dto/code-runner.dto';
import { TestCase } from '../shared/test-case.interface';
import axios from 'axios';
import { QuestionsService } from '../questions/questions.service';
@Injectable()
export class RunnerService {
  constructor(private readonly questionsService: QuestionsService) {}

  async run_code(codeRunnerDTO: CodeRunnerDto) {
    const question = await this.questionsService.findOne(
      codeRunnerDTO.question_id,
    );
    const testCases = question.test_cases;

    const results = [];
    for (const testCase of testCases) {
      const result = await this.submit_and_wait(codeRunnerDTO, testCase);
      results.push(result);
    }
    return results;
  }

  async submit_and_wait(codeRunnerDto: CodeRunnerDto, testCase: TestCase) {
    const response = await axios.post(
      'http://34.100.255.183:2358/submissions/?wait=true',
      {
        source_code: codeRunnerDto.code,
        language_id: codeRunnerDto.language_id,
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
