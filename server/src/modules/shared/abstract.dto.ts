import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';
import { userObjectDto } from './user.dto';

export class AbstractDTO {
  @ApiProperty({
    description: 'Id',
    type: String,
  })
  @Expose()
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'Created Timestamp',
  })
  @Expose()
  @IsOptional()
  @IsDateString()
  created_at: Date;

  @ApiProperty({
    description: 'Last Updated At Timestamp',
  })
  @IsDateString()
  @IsOptional()
  @Expose()
  last_updated_at: Date;

  @ApiProperty({
    description: 'Created User',
  })
  @IsOptional()
  @Expose()
  created_by: userObjectDto;

  @ApiProperty({
    description: 'Last Updated User',
  })
  @IsOptional()
  @Expose()
  last_updated_by: userObjectDto;
}

export class DeleteDTO {
  @ApiProperty({
    description: 'Success status',
    type: Boolean,
  })
  success: boolean;

  @ApiProperty({
    description: 'Deleted Object Id',
    type: String,
  })
  id: string;
}
