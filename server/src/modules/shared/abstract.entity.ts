import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { IUser } from './user.interface';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  last_updated_at: Date;

  //Better to store the relation with user entity
  @Column('jsonb', { nullable: true })
  created_by: IUser;

  @Column('jsonb', { nullable: true })
  last_updated_by: IUser;

  // @Column('jsonb',{nullable:true})
  // extra_info : object
}
