import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'slider' })
export class Slider extends BaseEntity {
  @Column({ type: 'int', nullable: true })
  sliderNumber: number;

  @Column({ type: 'varchar', length: 300 })
  imageUrl: string;
}
