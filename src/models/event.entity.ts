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

  @Column({ type: 'varchar', length: 300, nullable:true })
  finissage: string;
  
  @Column({ type: 'varchar', length: 300,nullable:true })
  finissageText:string;

  @Column({ type: 'varchar', length: 300 })
  description: string;  

  // Deu
  @Column({ type: 'varchar', length: 300 })
  cityDeu: string;

  @Column({ type: 'varchar', length: 300 })
  addressDeu: string;

  @Column({ type: 'varchar', length: 300 })
  finissageDeu: string;

  @Column({ type: 'varchar', length: 300 })
  finissageTextDeu: string;

  @Column({ type: 'varchar', length: 300 })
  descriptionDeu: string; 
}

