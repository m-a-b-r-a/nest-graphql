import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from 'src/student/student.module';
import { LessonEntity } from './entities/lesson.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([LessonEntity]),
        StudentModule
    ],
    providers: [LessonResolver, LessonService]
})
export class LessonModule {}
