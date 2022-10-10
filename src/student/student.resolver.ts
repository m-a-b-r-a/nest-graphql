import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentType } from './entities/student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentType)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentService.create(createStudentInput);
  }

  @Query(() => [StudentType], { name: 'student' })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => StudentType, { name: 'student' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.studentService.findOne(id);
  }

  @Mutation(() => StudentType)
  updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
    return this.studentService.update(updateStudentInput.id, updateStudentInput);
  }

  @Mutation(() => StudentType)
  removeStudent(@Args('id', { type: () => String }) id: string) {
    return this.studentService.remove(id);
  }
}
