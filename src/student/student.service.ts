import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import {v4 as uuid} from 'uuid';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) 
    private studentRepo : Repository<Student>
    ){}

  async create(createStudentInput: CreateStudentInput) {
    const {firstName,lastName} = createStudentInput;
   const data = await this.studentRepo.create({
    id: uuid(),
    firstName,
    lastName
   });
   this.studentRepo.save(data);
   return data;

  }

  async getManyStudents(studentIds:string[]): Promise<Student[]>{
    return this.studentRepo.find({
      where:{
          id : In([...studentIds]),
      }
    })
  }

  async findAll() {
    return await this.studentRepo.find();
  }

  async findOne(id: string) {
    return await this.studentRepo.findOne({where:{id}});
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return `This action updates a #${id} student`;
  }

  async remove(id: string) {
   const data = await this.findOne(id);
  }
}
