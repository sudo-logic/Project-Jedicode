import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { AbstractEntity } from '../shared/abstract.entity';
import { Room } from '../rooms/rooms.entity';

@Entity()
export class Submission extends AbstractEntity {
  @ManyToOne(() => User, (user) => user.submissions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Question, (question) => question.submissions)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => Room, (room) => room.submissions)
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column()
  user_id: string;

  @Column()
  question_id: string;

  @Column()
  room_id: string;

  @Column()
  code: string;

  @Column()
  language: string;

  @Column()
  score: number;

  @Column({ type: 'json', nullable: true })
  runner_response: object;
}
