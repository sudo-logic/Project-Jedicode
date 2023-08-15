import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { AbstractEntity } from '../shared/abstract.entity';

@Entity()
export class Room extends AbstractEntity {
  // @PrimaryColumn({ unique: true, nullable: false })
  // room_url: string;

  @ManyToMany(() => Question, { eager: true })
  @JoinTable()
  questions: Question[];

  @Column('json', { nullable: true })
  player_data: { user_id: string; score: number; is_host: boolean }[];
  // player_data: { [user: string]: { score: number; is_host: boolean } }[];


  @Column({ nullable: true })
  completed_at: Date;

  @Column({ default: 'lobby' })
  status: string;
}
