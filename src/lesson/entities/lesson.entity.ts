import { Student } from "src/student/entities/student.entity";
import { StudentType } from "src/student/entities/student.type";
import { BaseEntity, Column, Entity, ManyToOne, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class LessonEntity extends BaseEntity {
    @ObjectIdColumn()
    _id:string
    @PrimaryColumn()
    id:string;
    @Column()
    name:string
    @Column()
    startDate:string
    @Column()
    endDate:string
    
    @Column()
    students:string[]

    // @ManyToOne(() => Student, (student) => student.lessons)
    // student:Student



}