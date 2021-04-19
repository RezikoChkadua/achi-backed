import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slider } from '../../models/slider.entity';
const { v4: uuidv4 } = require('uuid');
import * as fs from "fs";

@Injectable()
export class SliderService {
    constructor(@InjectRepository(Slider) private readonly repo: Repository<Slider>) {}
    public async create(dto:  any): Promise<any> {
        let pool = []
        for(let i = 0; i < dto.pictures.length; i++){
            const { base64, type } = dto.pictures[i]
            let base64Image = base64.split(';base64,').pop();
            let name = uuidv4()
            let ext = type.split('/')[1]
            require("fs").writeFile(`public/${name}.${ext}`, base64Image, { encoding: 'base64' }, function(err) {
                console.log(err);
            });

             pool.push(this.repo.save({ imageUrl: `${name}.${ext}` }))
        }

        return await Promise.all(pool)
    }

    public async getAll(){
        return await this.repo.find()
    }

    public async deleteItem(id){
        const data = await this.repo.findOne({ id })
        fs.unlinkSync(`public/${data.imageUrl}`)
        return await this.repo.delete({ id })
    }
    }
