import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
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

  @ManyToOne(() => Submission, (submission) => submission.user, { eager: true })
  submissions: Submission[];

  @ManyToMany(() => Question, (question) => question.id, { eager: true })
  @JoinTable()
  questions_attempted: User[];
}
