import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../../models/message.entity';
import { MessageDTO } from './message.dto';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private readonly repo: Repository<Message>) { }
  
  public async getAll(query): Promise<MessageDTO[]> {
    let options = this.calculateOptions(query)
    console.log('options', options)
    const data = await this.repo.find(options)
    .then(items => items.map(e => MessageDTO.fromEntity(e)));
    return data
  }

  public async getAllForWeb(): Promise<MessageDTO[]> {
    return await this.repo.find({ where: { status: 'Approved' } })
      .then(items => items.map(e => MessageDTO.fromEntity(e)));
    }
    
  public async create(dto:  MessageDTO): Promise< MessageDTO> {
    let data = MessageDTO.toEntity(dto)
    return await this.repo.save(data)
      .then(e =>  MessageDTO.fromEntity(e));
  }

  public async getOne(id: string): Promise< MessageDTO> {
    return await this.repo.findOne(id)
  }

  public async updateMessage(id: string, dto): Promise<any> {
    return  await this.repo.save({ id, ...dto})
  }

  public async deleteMessage(id: string): Promise<any> {
    return  await this.repo.delete({ id })
  }

  calculateOptions(query){
    let { filter, range, sort} = query
    let option = {}
    if(sort){
      option['sort'] = JSON.parse(sort) 
    }
    if(range){
      let parsedRange = JSON.parse(range)
      option['skip'] = Number(parsedRange[0])
      option['take'] = Number(parsedRange[1] + 1)
    }
    // {"startDate":"2021-04-16","endDate":"2021-04-24"}
    if(filter) {
      let dateQuery = {}
      let parsedFilter = JSON.parse(filter)
      if(parsedFilter.startDate){
        dateQuery = { createDateTime : MoreThanOrEqual(parsedFilter.startDate) }
        delete parsedFilter['startDate']
      }
      if(parsedFilter.endDate){
        dateQuery = { ...dateQuery, createDateTime : LessThanOrEqual(parsedFilter.endDate) }
        delete parsedFilter['endDate']
      }
      option['where'] = { ...parsedFilter, ...dateQuery}
    }

    return option
  }


  

  
}
