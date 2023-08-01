import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { AbstractEntity } from '../shared/abstract.entity';

@Entity()
export class Submission extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.submissions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;

  @ManyToOne(() => Question, (question) => question.submissions)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column()
  question_id: string;

  @Column()
  code: string;

  @Column()
  language: string;

  @Column()
  score: number;
}
