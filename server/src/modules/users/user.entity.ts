import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  AfterLoad,
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

  @Column({ select: false })
  password: string;

  // @Column({ default: 0 })
  // score: number;

  @OneToMany(() => Submission, (submission) => submission.user, { eager: true })
  submissions: Submission[];

  @ManyToMany(() => Question, (question) => question.id, {})
  @JoinTable()
  questions_attempted: Question[];

  score: number;

  @AfterLoad()
  calculateScore() {
    if (this.submissions) {
      this.score = this.submissions.reduce(
        (acc, submission) => acc + submission.score,
        0,
      );
    } else {
      this.score = 0;
    }
  }
}
