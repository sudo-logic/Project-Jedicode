import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { Submission } from '../submissions/submissions.entity';
import { AbstractEntity } from '../shared/abstract.entity';
import { User } from '../users/user.entity';

@Entity()
export class Question extends AbstractEntity {
  @Column()
  title: string;

  @Column('simple-array')
  tags: string[];

  @Column('text')
  problem_statement: string;

  @Column('jsonb')
  test_cases: { input: string; output: string }[];

  @Column('jsonb')
  constraints: string[];

  @Column('text')
  difficulty: string;

  @Column('jsonb')
  examples: { input: string; output: string; explaination: string };

  @OneToMany(() => Submission, (submission) => submission.question_id)
  submissions: Submission[];

  @ManyToMany(() => User, (user) => user.questions_attempted)
  viewers: User[];
}
