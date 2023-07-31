import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Submission } from '../submissions/submissions.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('simple-array')
  tags: string[];

  @Column('text')
  problem_statement: string;

  @Column('jsonb')
  test_cases: { input: string; output: string }[];

  @OneToMany(() => Submission, (submission) => submission.question_id)
  submissions: Submission[];
}
