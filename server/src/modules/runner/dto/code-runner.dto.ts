import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CodeRunnerDto {
  @IsNotEmpty()
  @IsNumber()
  language_id: number;

  @IsUUID()
  @IsNotEmpty()
  question_id: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
