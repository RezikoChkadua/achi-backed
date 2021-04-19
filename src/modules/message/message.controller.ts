import { Body, Controller, Delete, Get, Header, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Public } from '../../utils/ispublic.decorator';
import { MessageDTO } from './message.dto';
import { MessagesService } from './message.service';


@Controller('messages')
export class MessagesController {
  constructor(private service: MessagesService) { }
  
  @Get()
  @Header('Access-Control-Expose-Headers','*')
  @Header('Content-Range','messages 0-20/319')
  public async getAll(@Query() query: any): Promise<MessageDTO[]> {
    return await this.service.getAll(query)
  }

  @Get('/web')
  @Public()
  @Header('Access-Control-Expose-Headers','*')
  @Header('Content-Range','messages 0-20/319')
  public async getAllForWeb(): Promise<MessageDTO[]> {
    return await this.service.getAllForWeb()
  }
  
  @Post()
  @Public()
  public async post(@Body() dto: MessageDTO): Promise<MessageDTO> {
    return this.service.create(dto);
  }

  @Get('/:id')
  @Header('Access-Control-Expose-Headers','*')
  @Header('Content-Range','messages 0-20/319')
  public async getMessage(@Param('id') id: string): Promise<MessageDTO> {
    return await this.service.getOne(id)
  }

  @Put('/:id')
   public async updateMessage(@Param('id') id: string,@Body() dto: Partial<MessageDTO>): Promise<MessageDTO> {
    return await this.service.updateMessage(id, dto)
  }

  @Delete('/:id')
  public async deleteMessage(@Param('id') id: string): Promise<MessageDTO> {
   return await this.service.deleteMessage(id)
 }
}
