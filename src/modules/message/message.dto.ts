import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID, } from 'class-validator';
import { Message } from '../../models/message.entity';
import { MessageStatus } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export class MessageDTO implements Readonly<MessageDTO> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  text: string;

  @ApiProperty({ required: true })
  @IsString()
  status: string;

  @ApiProperty({ required: false })
  @IsString()
  createDateTime: Date;

  public static from(dto: Partial<MessageDTO>) {
    const it = new MessageDTO();
    it.id = dto.id;
    it.text = dto.text;
    it.createDateTime = dto.createDateTime,
    it.status = dto.status;
    return it;
  }

  public static fromEntity(entity: Message) {
    return this.from({
      id: entity.id,
      text: entity.text,
      createDateTime: entity.createDateTime,
      status: entity.status
    });
  }

  public static toEntity(dto: MessageDTO) {
    const it = new Message();
    it.id = uuidv4();
    it.text = dto.text;
    it.status = MessageStatus.Pending;
    it.createDateTime = new Date();
    return it;
  }

}
