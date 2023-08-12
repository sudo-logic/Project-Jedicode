import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsUUID, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class userObjectDto {
  @ApiProperty({
    description: 'User Id',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'User Id should not be empty' })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'User Name',
  })
  @IsString({ message: 'User Name should be a string' })
  @IsNotEmpty({ message: 'User Name should not be empty' })
  @Expose()
  username: string;

  @ApiProperty({
    description: 'User Email',
  })
  @IsEmail()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @Expose()
  email: string;

  // // Queestions Attempted
  // @ApiProperty({
  //   description: 'Questions Attempted',
  // })
  // @Expose()
  // @Transform((value) => {
  //   return value.value.map((item) => {
  //     return item.id;
  //   });
  // })
  // questions_attempted: string[];
}
