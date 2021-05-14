import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from '../../models/event.entity';
import { EventSliderService } from '../event-slider/event-slider.service';
import { EventsDTO } from './events.dto';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events) private readonly repo: Repository<Events>,
    private readonly eventSliderService: EventSliderService,
  ) {}

  public async getAll(query): Promise<EventsDTO[]> {
    const language = query.language;
    let options = this.calculateOptions(query);

    const data = await this.repo
      .find(options)
      .then(items => items.map(e => EventsDTO.fromEntity(e)));

    return this.handleLanguage(language, data);
  }

  public async getOneSlider(id: string): Promise<unknown> {
    return await this.eventSliderService.findAllByEventId(id);
  }

  public async deleteEventSliderImage(id: string): Promise<unknown> {
    return await this.eventSliderService.delete(id);
  }

  public async getAllForWeb(): Promise<EventsDTO[]> {
    return await this.repo
      .find({ where: { approved: true } })
      .then(items => items.map(e => EventsDTO.fromEntity(e)));
  }

  public async create(dto: EventsDTO): Promise<EventsDTO> {
    let data = EventsDTO.toEntity(dto);
    return await this.repo.save(data).then(e => EventsDTO.fromEntity(e));
  }

  public async getOne(id: string): Promise<EventsDTO> {
    return await this.repo.findOne(id);
  }

  public async updateEvent(id: string, dto): Promise<any> {
    if (dto.pictures && dto.pictures.length) {
      await this.eventSliderService.saveMany(id, dto.pictures);
    }

    return await this.repo.save({ id, ...dto });
  }

  public async deleteEvent(id: string): Promise<any> {
    const eventsImages = await this.eventSliderService.getAllByEventsId(id);
    for (let image of eventsImages) {
      await this.eventSliderService.delete(image.id);
    }

    return await this.repo.delete({ id });
  }

  calculateOptions(query) {
    let { filter, range, sort } = query;
    let option = {};
    if (sort) {
      option['sort'] = typeof sort === 'object' ? sort : JSON.parse(sort);
    }
    if (range) {
      let parsedRange = JSON.parse(range);
      option['skip'] = Number(parsedRange[0]);
      option['take'] = Number(parsedRange[1] + 1);
    }
    // {"startDate":"2021-04-16","endDate":"2021-04-24"}
    if (filter) {
      let dateQuery = {};
      let parsedFilter =
        typeof filter === 'object' ? filter : JSON.parse(filter);

      if (parsedFilter.startDate) {
        dateQuery = { createDateTime: MoreThanOrEqual(parsedFilter.startDate) };
        delete parsedFilter['startDate'];
      }

      if (parsedFilter.endDate) {
        dateQuery = {
          ...dateQuery,
          createDateTime: LessThanOrEqual(parsedFilter.endDate),
        };
        delete parsedFilter['endDate'];
      }

      if (parsedFilter.futureEvent) {
        dateQuery = { date: MoreThanOrEqual(parsedFilter.futureEvent) };
        delete parsedFilter['futureEvent'];
      }

      if (parsedFilter.pastEvent) {
        dateQuery = { date: LessThanOrEqual(parsedFilter.pastEvent) };
        delete parsedFilter['pastEvent'];
      }

      option['where'] = { ...parsedFilter, ...dateQuery };
    }

    return option;
  }

  handleLanguage(lang, data: EventsDTO[]) {
    if (lang === 'de') {
      return data.map(item => ({
        id: item.id,
        city: item.cityDeu,
        date: item.date,
        address: item.addressDeu,
        secondAddress: item.secondAddressDeu,
        finissageText: item.finissageTextDeu,
        description: item.descriptionDeu,
      }));
    }

    return data;
  }
}
