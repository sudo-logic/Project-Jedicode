import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Submission } from '../submissions/submissions.entity';

import { AbstractEntity } from '../shared/abstract.entity';
import { Question } from '../questions/question.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  score: number;

  @ManyToOne(() => Submission, (submission) => submission.user_id)
  submissions: Submission[];

  @ManyToOne(() => Question, (question) => question.id)
  questions_attempted: User[];
}
