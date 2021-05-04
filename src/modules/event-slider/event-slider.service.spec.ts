import { Test, TestingModule } from '@nestjs/testing';
import { EventSliderService } from './event-slider.service';

describe('EventSliderService', () => {
  let service: EventSliderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventSliderService],
    }).compile();

    service = module.get<EventSliderService>(EventSliderService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
