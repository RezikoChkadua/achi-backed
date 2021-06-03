import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from '../../utils/ispublic.decorator';
import { SliderService } from './slider.service';

@Public()
@Controller('slider')
export class SliderController {
  constructor(private service: SliderService) {}

  @Post(':id')
  @Header('Access-Control-Expose-Headers', '*')
  @Header('Content-Range', 'messages 0-20/319')
  public async post(@Param() { id }, @Body() dto: unknown): Promise<unknown> {
    return this.service.create(dto, id);
  }

  @Get(':id')
  @Header('Access-Control-Expose-Headers', '*')
  @Header('Content-Range', 'messages 0-20/319')
  public async getAll(@Param() { id }): Promise<unknown> {
    return this.service.getAll(id);
  }

  @Delete(':sliderNumber/:id')
  @Header('Access-Control-Expose-Headers', '*')
  @Header('Content-Range', 'messages 0-20/319')
  public async deleteItem(@Param('id') id): Promise<unknown> {
    return this.service.deleteItem(id);
  }

  @Delete('/:id')
  @Header('Access-Control-Expose-Headers', '*')
  @Header('Content-Range', 'messages 0-20/319')
  public async deleteEventItem(@Param('id') id): Promise<unknown> {
    return this.service.deleteItem(id);
  }
}
