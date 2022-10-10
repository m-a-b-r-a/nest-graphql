import { LessonEntity } from 'src/lesson/entities/lesson.entity';
import { BaseEntity, Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm';
import { StudentType } from './student.type';

@Entity()
export class Student extends BaseEntity{
  @ObjectIdColumn()
  _id:string
  @Column()
  id:string
  @Column()
  firstName:string
  @Column()
  lastName:string

  // @OneToMany(() => LessonEntity,(lesson) => lesson.student)
  // lessons : LessonEntity[]
}
