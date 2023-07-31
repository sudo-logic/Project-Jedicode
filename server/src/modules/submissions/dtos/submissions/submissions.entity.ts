import { Question } from 'src/modules/questions/question.entity';
import { User } from 'src/modules/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => User, (user) => user.submissions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column() user_id: string;

  @ManyToOne(() => Question, (question) => question.submissions)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column() question_id: string;

  @Column() code: string;

  @Column() language: string;

  @Column() score: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  submitted_at: Date;
}
