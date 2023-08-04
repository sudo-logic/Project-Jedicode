import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TestCaseDto {
  @IsNotEmpty()
  input: string;

  @IsNotEmpty()
  output: string;
}

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsString()
  problem_statement: string;

  @ValidateNested({ each: true })
  @Type(() => TestCaseDto)
  test_cases: TestCaseDto[];
}
