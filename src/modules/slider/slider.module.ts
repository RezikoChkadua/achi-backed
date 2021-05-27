import { Module } from '@nestjs/common';
import { SliderService } from './slider.service';
import { SliderController } from './slider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from '../../models/slider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slider])],
  providers: [SliderService],
  controllers: [SliderController],
  exports: [],
})
export class SliderModule {}
