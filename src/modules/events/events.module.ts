import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from '../../models/event.entity';
import { EventSliderModule } from '../event-slider/event-slider.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    EventSliderModule,
    TypeOrmModule.forFeature([Events])],
  providers: [EventsService],
  controllers: [EventsController],
  exports: []
})

export class EventsModule {}
