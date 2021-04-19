import { Test, TestingModule } from '@nestjs/testing';
import { EventSliderController } from './event-slider.controller';

describe('EventSlider Controller', () => {
  let controller: EventSliderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventSliderController],
    }).compile();

    controller = module.get<EventSliderController>(EventSliderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
