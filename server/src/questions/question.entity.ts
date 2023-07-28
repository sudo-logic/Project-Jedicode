import { Public } from 'src/auth/public.decorator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
