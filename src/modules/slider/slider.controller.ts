import { Body, Controller, Delete, Get, Header, Param, Post, Query } from '@nestjs/common';
import { Public } from '../../utils/ispublic.decorator';
import { SliderService } from './slider.service';

@Public()
@Controller('slider')
export class SliderController {
  constructor(private service: SliderService) { }
  
    @Post()
    @Header('Access-Control-Expose-Headers','*')
    @Header('Content-Range','messages 0-20/319')
    public async post(@Body() dto: unknown): Promise<unknown> {
      return this.service.create(dto);
    }
    
    @Get()
    @Header('Access-Control-Expose-Headers','*')
    @Header('Content-Range','messages 0-20/319')  
    public async getAll(): Promise<unknown> {
      return this.service.getAll();
    }
    
    @Delete(':id')
    @Header('Access-Control-Expose-Headers','*')
    @Header('Content-Range','messages 0-20/319')  
    public async deleteItem(@Param('id') id): Promise<unknown> {
      return this.service.deleteItem(id);
    }
}
