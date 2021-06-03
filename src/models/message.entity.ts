import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'message' })
export class Message extends BaseEntity {
  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'varchar' })
  status: string;
}
