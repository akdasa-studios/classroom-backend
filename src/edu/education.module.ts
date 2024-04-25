import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from './courses/courses.entity'
import { CoursesController } from './courses/courses.controller'
import { CoursesService } from './courses/courses.service'
import { Enrollment } from './enrollments/enrollments.entity'
import { EnrollmentsController } from './enrollments/enrollments.controller'
import { EnrollmentsService } from './enrollments/enrollments.service'
import { Group } from './groups/groups.entity'
import { GroupsController } from './groups/groups.controller'
import { GroupsService } from './groups/groups.service'
import { Lesson } from './lessons/lessons.entity'
import { LessonsController } from './lessons/lessons.controller'
import { LessonsService } from './lessons/lessons.service'
import { User } from 'src/org/users/users.entity'
import { IsUserExist, IsUserExistConstraint } from 'src/org/users/users.entity.validators'
import { UsersService } from 'src/org/users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([Course, Enrollment, Group, Lesson, User])],
  controllers: [CoursesController, EnrollmentsController, GroupsController, LessonsController],
  providers: [CoursesService, EnrollmentsService, GroupsService, LessonsService, IsUserExistConstraint, UsersService],
})
export class EducationModule {}
