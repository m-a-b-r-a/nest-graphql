import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AssingStudentsToLessonInput } from "src/student/assign-student-to-lesson.input";
import { StudentService } from "src/student/student.service";
import { CreateLessonInput } from "./dto/lesson.input";
import { LessonEntity } from "./entities/lesson.entity";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver(of => LessonType)
export class LessonResolver{

    constructor(
        private lessonService : LessonService,
        private studentService : StudentService
        ){}

    
    @Query(returns => LessonType)
        lesson(@Args('id') id:string){
            return this.lessonService.findOne(id);
        }

    @Query(returns => [LessonType])
        lessons(){
            return this.lessonService.findAll();
        }

    @Mutation(returns => LessonType)
        createLesson(
            @Args('data') data:CreateLessonInput
            ){
                return this.lessonService.create(data);

        }
    @Mutation(returns => LessonType)
        updateLesson(
            @Args('id') id:string, @Args('data') data:CreateLessonInput){
                return this.lessonService.update(id,data)
            }
    @Mutation(returns => Boolean)
        deleteLesson(
            @Args('id') id:string
        ){
            return this.lessonService.delete(id);
        }
    @Mutation(returns => LessonType)
    assingStudentsToLesson(
        @Args('data') data : AssingStudentsToLessonInput
    ){
        const {lessonId,studentIds} = data;
        return this.lessonService.assingStudentsToLesson(lessonId,studentIds);
    }
    @ResolveField()
    async students(@Parent() lesson:LessonEntity){
        return this.studentService.getManyStudents(lesson.students);
    }
        

}