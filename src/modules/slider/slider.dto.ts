import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';
import { Message } from '../../models/message.entity';
import { Slider } from '../../models/slider.entity';
import { MessageStatus } from '../../types';
import { User } from '../../user.decorator';

export class SliderDto implements Readonly<SliderDto> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsNumber()
  sliderNumber: number;

  @ApiProperty({ required: false })
  @IsString()
  imageUrl: string;

  public static from(dto: Partial<SliderDto>) {
    const it = new SliderDto();
    it.id = dto.id;
    it.imageUrl = dto.imageUrl;
    it.sliderNumber = dto.sliderNumber;
    return it;
  }

  public static fromEntity(entity: Slider) {
    return this.from({
      id: entity.id,
      imageUrl: entity.imageUrl,
      sliderNumber: entity.sliderNumber,
    });
  }

  public static toEntity(dto: SliderDto) {
    const it = new Slider();
    it.id = dto.id;
    it.imageUrl = dto.imageUrl;
    it.sliderNumber = dto.sliderNumber;
    return it;
  }
}
