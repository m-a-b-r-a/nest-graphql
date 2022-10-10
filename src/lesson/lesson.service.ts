import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonEntity } from './entities/lesson.entity';
import {v4  as uuid} from 'uuid';
import { LessonType } from './lesson.type';
import { userInfo } from 'os';
import { CreateLessonInput } from './dto/lesson.input';
@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(LessonEntity) 
        private lessonRepo:Repository<LessonEntity>){}

    async create(createLessonInput : CreateLessonInput):Promise<LessonEntity>{
        const {name,startDate,endDate,students} = createLessonInput;
        const lesson = this.lessonRepo.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students,
        });
        await this.lessonRepo.save(lesson);
        return lesson;
        
    }
    async findOne(id:string):Promise<LessonEntity>{
        
        const lesson = await this.lessonRepo.findOne({
            where: {
                id
            }
        });
        if(!lesson){
            throw new NotFoundException('lesson not found');
        }
        return lesson;
    }
    async findAll():Promise<LessonEntity[]>{
        return await this.lessonRepo.find();
    }

    async update(id:string,data:CreateLessonInput):Promise<LessonEntity>{
    const lesson = await this.findOne(id);
    Object.assign(lesson,data);
    await lesson.save();
    return lesson;
    }

    async delete(id:string):Promise<Boolean>{
        const lesson = await this.findOne(id);
        if(!lesson){
            throw new NotFoundException('lesson not found');
        }
        await lesson.remove();
        return true;
    }

    async assingStudentsToLesson(lessonId:string,studentId:string[]){
        const lesson = await this.lessonRepo.findOne({
            where:{
                id : lessonId
            }
        })
        lesson.students = [...lesson.students,...studentId];
        return this.lessonRepo.save(lesson);
    }
}
