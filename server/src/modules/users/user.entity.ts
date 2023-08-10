import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Submission } from '../submissions/submissions.entity';

import { AbstractEntity } from '../shared/abstract.entity';
import { Question } from '../questions/question.entity';
import { Exclude } from 'class-transformer';

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

  @OneToMany(() => Submission, (submission) => submission.user, {})
  submissions: Submission[];

  @ManyToMany(() => Question, (question) => question.id, {})
  @JoinTable()
  questions_attempted: User[];
}
