import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './submissions.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Submission])],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
