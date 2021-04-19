import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../../models/message.entity';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessagesService],
  controllers: [MessagesController],
  exports: []
})
export class MessagesModule {}
