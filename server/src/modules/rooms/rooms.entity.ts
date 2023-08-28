import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { AbstractEntity } from '../shared/abstract.entity';
import { Submission } from '../submissions/submissions.entity';

@Entity()
export class Room extends AbstractEntity {
  // @PrimaryColumn({ unique: true, nullable: false })
  // room_url: string;

  @ManyToMany(() => Question, { eager: true })
  @JoinTable()
  questions: Question[];

  @OneToMany(() => Submission, (submission) => submission.room, {})
  submissions: Submission[];

  // Users in the room
  @ManyToMany(() => User, (user) => user.rooms, { eager: true })
  @JoinTable()
  users: User[];

  @Column('json', { nullable: true })
  player_data: { user_id: string; score: number; is_host: boolean }[];
  // player_data: { [user: string]: { score: number; is_host: boolean } }[];

  @Column({ nullable: true })
  started_at: Date;

  @Column({ nullable: true })
  completed_at: Date;

  @Column({ default: 'lobby' })
  status: string;

  @Column('json', { nullable: true })
  room_config: { count: number; duration: number };
}
