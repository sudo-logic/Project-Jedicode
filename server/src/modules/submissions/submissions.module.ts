import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from './submissions.entity';
import { RunnerService } from '../runner/runner.service';
import { RunnerModule } from '../runner/runner.module';
@Module({
  imports: [TypeOrmModule.forFeature([Submission]), RunnerModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
