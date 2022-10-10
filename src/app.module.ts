import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './lesson/entities/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/entities/student.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mongodb',
      url:'mongodb://localhost/school',
      synchronize:true,
      useUnifiedTopology:true,
      entities:[LessonEntity,Student]
    }) ,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      //save schema di memory,dan regenerate setiap restart server
      autoSchemaFile:true,
      driver: ApolloDriver
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
