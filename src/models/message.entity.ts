import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'message' })
export class Message extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  text: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;
}
