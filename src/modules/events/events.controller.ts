import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query } from '@nestjs/common';
import { Public } from '../../utils/ispublic.decorator';
import { EventsDTO } from './events.dto';
import { EventsService } from './events.service';


@Controller('events')
export class EventsController {
  constructor(private service: EventsService) { }
  
  @Get('/slider/:id')
  @Header('Access-Control-Expose-Headers','*')
  @Header('Content-Range','messages 0-20/319')  
  @Header('content-type', 'application/json')
  @Public()
  public async getEventsSlider(@Param('id') id: string): Promise<unknown> {
    return await this.service.getOneSlider(id)
  }

  @Get()
  @Public()
  @Header('Access-Control-Expose-Headers','*')
  @Header('Content-Range','events 0-20/319')
  public async getAll(@Query() query: any): Promise<EventsDTO[]> {
    return await this.service.getAll(query)
  }


  @Get(':id')
  @Public()
  public async getEvents(@Param('id') id: string): Promise<EventsDTO> {
    return await this.service.getOne(id)
  }

  
  @Post()
  public async post(@Body() dto: EventsDTO): Promise<EventsDTO> {
    return this.service.create(dto);
  }

  @Put('/:id')
   public async updateEvent(@Param('id') id: string, @Body() dto: Partial<EventsDTO>): Promise<EventsDTO> {
    return await this.service.updateEvent(id, dto)
  }

  @Delete('/slider/:id')
  public async deleteEventSliderImage(@Param('id') id: string, @Body() dto: Partial<EventsDTO>): Promise<unknown> {
   return await this.service.deleteEventSliderImage(id)
 }

  @Delete('/:id')
  public async deleteEvent(@Param('id') id: string, @Body() dto: Partial<EventsDTO>): Promise<EventsDTO> {
   return await this.service.deleteEvent(id)
 }


}
