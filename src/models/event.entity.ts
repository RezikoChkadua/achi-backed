import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EventSlider } from './eventSlider.entity';

@Entity({ name: 'event' })
export class Events extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  city: string;

  @Column({ type: 'varchar', length: 300 })
  date: Date;

  @Column({ type: 'varchar', length: 300 })
  address: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  secondAddress: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  finissageText: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  // Deu
  @Column({ type: 'varchar', length: 300, nullable: true })
  cityDeu: string;

  @Column({ type: 'varchar', length: 300 })
  addressDeu: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  secondAddressDeu: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  finissageTextDeu: string;

  @Column({ type: 'varchar', nullable: true })
  descriptionDeu: string;
}
