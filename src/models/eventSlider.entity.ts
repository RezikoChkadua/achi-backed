import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'event-slider' })
export class EventSlider extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  imageUrl: string;

  // @ManyToOne(type => Events, event => event.imageUrls)
  @Column({ type: 'varchar', length: 300 })
  event: string;
}
