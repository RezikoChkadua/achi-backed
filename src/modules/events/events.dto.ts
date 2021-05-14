import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Events } from '../../models/event.entity';

export class EventsDTO implements Readonly<EventsDTO> {
  @IsOptional()
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

  @IsOptional()
  @ApiProperty({ required: true })
  @IsString()
  secondAddress: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString()
  finissageText: string;

  @IsOptional()
  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true })
  @IsString()
  cityDeu?: string;

  @IsOptional()
  @ApiProperty({ required: true })
  @IsArray()
  secondAddressDeu?: string;

  @IsOptional()
  @ApiProperty({ required: true })
  @IsArray()
  addressDeu?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsArray()
  finissageTextDeu?: string;

  @IsOptional()
  @ApiProperty({ required: true })
  @IsArray()
  descriptionDeu?: string;

  public static from(dto: Partial<EventsDTO>) {
    const it = new EventsDTO();
    it.id = dto.id;
    it.city = dto.city;
    it.date = dto.date;
    it.address = dto.address;
    it.secondAddress = dto.secondAddress;
    it.finissageText = dto.finissageText;
    it.description = dto.description;
    it.cityDeu = dto.cityDeu;
    it.addressDeu = dto.addressDeu;
    it.secondAddressDeu = dto.secondAddressDeu;
    it.finissageTextDeu = dto.finissageTextDeu;
    it.descriptionDeu = dto.descriptionDeu;

    return it;
  }

  public static fromEntity(entity: Events) {
    return this.from({
      id: entity.id,
      city: entity.city,
      date: entity.date,
      address: entity.address,
      secondAddress: entity.secondAddress,
      finissageText: entity.finissageText,
      description: entity.description,

      cityDeu: entity.cityDeu,
      addressDeu: entity.addressDeu,
      secondAddressDeu: entity.secondAddressDeu,
      finissageTextDeu: entity.finissageTextDeu,
      descriptionDeu: entity.descriptionDeu,
    });
  }

  public static toEntity(dto: EventsDTO) {
    const it = new Events();
    it.id = dto.id;
    it.city = dto.city;
    it.date = dto.date;
    it.address = dto.address;
    it.secondAddress = dto.secondAddress;

    it.finissageText = dto.finissageText;
    it.description = dto.description;
    it.cityDeu = dto.cityDeu;
    it.addressDeu = dto.addressDeu;
    it.secondAddressDeu = dto.secondAddressDeu;
    it.finissageTextDeu = dto.finissageTextDeu;
    it.descriptionDeu = dto.descriptionDeu;

    it.createDateTime = new Date();
    return it;
  }
}
