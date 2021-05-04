import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventSlider } from '../../models/eventSlider.entity';
const { v4: uuidv4 } = require('uuid');
import * as fs from 'fs';

@Injectable()
export class EventSliderService {
  constructor(
    @InjectRepository(EventSlider)
    private readonly repo: Repository<EventSlider>,
  ) {}

  public async getAllByEventsId(id: String): Promise<any[]> {
    return await this.repo.find({ where: { event: id } });
  }

  async saveMany(id: string, images: any) {
    for (let i = 0; i < images.length; i++) {
      const { base64, type } = images[i];
      let base64Image = base64.split(';base64,').pop();
      let name = uuidv4();
      let ext = type.split('/')[1];
      require('fs').writeFile(
        `public/${name}.${ext}`,
        base64Image,
        { encoding: 'base64' },
        function(err) {
          console.log(err);
        },
      );

      await this.repo.save({ event: id, imageUrl: `${name}.${ext}` });
    }
  }

  async findAllByEventId(id: string) {
    return await this.repo.find({ where: { event: id } });
  }

  async delete(id: string) {
    const data = await this.repo.findOne({ id });
    fs.unlinkSync(`public/${data.imageUrl}`);
    return await this.repo.delete({ id });
  }
}
