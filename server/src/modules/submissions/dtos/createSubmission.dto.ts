import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'a,b=map(int,input().split());print(a+b+1)',
    description: 'The code to be executed',
  })
  code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Python',
    description: 'The language of the code to be executed',
  })
  language: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 71,
    description: 'The score of the submission',
  })
  language_id: number;

  // @IsNumber()
  // @IsNotEmpty()
  // score: number;

  // @IsUUID()
  // @IsNotEmpty()
  // user_id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: 'c2db2b49-8794-40c0-9eb6-d54c9a44d27a',
    description: 'The question id',
  })
  question_id: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: '57a5398d-487c-4bc0-89cd-970339032b3a',
    description: 'The room id',
  })
  room_id: string;
}
