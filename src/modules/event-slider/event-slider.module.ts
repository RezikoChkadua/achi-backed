import { Module } from '@nestjs/common';
import { EventSliderService } from './event-slider.service';
import { EventSliderController } from './event-slider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSlider } from '../../models/eventSlider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventSlider])],
  providers: [EventSliderService],
  controllers: [EventSliderController],
  exports: [EventSliderService]

})
export class EventSliderModule {}
