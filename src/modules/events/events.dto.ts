import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsString, IsUUID, } from 'class-validator';
import { Events } from '../../models/event.entity';

export class EventsDTO implements Readonly<EventsDTO> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  city: string;

  @ApiProperty({ required: true })
  @IsString()
  date: Date;

  @ApiProperty({ required: true })
  @IsString()
  address: string;

  @ApiProperty({ required: false })
  @IsString()
  finissage: string;

  @ApiProperty({ required: false })
  @IsString()
  finissageText: string;
  
  @ApiProperty({ required: true })
  @IsString()
  description: string;
  
  @ApiProperty({ required: true })
  @IsString()
  cityDeu: string;

  @ApiProperty({ required: true })
  @IsArray()
  addressDeu?: string;

  @ApiProperty({ required: false })
  @IsArray()
  finissageDeu?: string;

  @ApiProperty({ required: false })
  @IsArray()
  finissageTextDeu?: string;

  @ApiProperty({ required: true })
  @IsArray()
  descriptionDeu?: string;
  
  
  public static from(dto: Partial<EventsDTO>) {
    const it = new EventsDTO();
    it.id = dto.id
    it.city = dto.city
    it.date = dto.date
    it.address = dto.address
    it.finissage = dto.finissage
    it.finissageText= dto.finissageText
    it.description = dto.description
    it.cityDeu = dto.cityDeu
    it.addressDeu = dto.addressDeu
    it.finissageDeu = dto.finissageDeu
    it.finissageTextDeu = dto.finissageTextDeu
    it.descriptionDeu = dto.descriptionDeu

    return it;
  }

  public static fromEntity(entity: Events) {
    return this.from({
      id: entity.id,
      city: entity.city,
      date: entity.date,  
      address: entity.address,
      finissage: entity.finissage,
      finissageText: entity.finissageText,
      description: entity.description,
      
      cityDeu: entity.cityDeu,
      addressDeu: entity.addressDeu,
      finissageDeu: entity.finissageDeu,
      finissageTextDeu: entity.finissageTextDeu,
      descriptionDeu: entity.descriptionDeu
    });
  }

  public static toEntity(dto: EventsDTO) {
    const it = new Events();
    it.id = dto.id,
    it.city = dto.city, 
    it.date = dto.date,
    it.address = dto.address,
    it.finissage = dto.finissage,
    it.finissageText = dto.finissageText,
    it.description = dto.description,
    
    it.cityDeu = dto.cityDeu,
    it.addressDeu = dto.addressDeu,
    it.finissageDeu = dto.finissageDeu,
    it.finissageTextDeu = dto.finissageTextDeu,
    it.descriptionDeu = dto.descriptionDeu

    it.createDateTime = new Date();
    return it;
  }

}
