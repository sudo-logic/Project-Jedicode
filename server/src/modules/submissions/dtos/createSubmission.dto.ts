import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  question_id: string;
}
