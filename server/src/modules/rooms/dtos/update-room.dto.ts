import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Question } from 'src/modules/questions/question.entity';

export class UpdateRoomDto {
  @IsOptional()
  @IsArray()
  player_data: { user_id: string; score: number; is_host: boolean }[];

  @IsOptional()
  completed_at: Date;

  @IsOptional()
  @IsString()
  status: string;
}
