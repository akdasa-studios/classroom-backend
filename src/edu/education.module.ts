import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from './courses/courses.entity'
import { CoursesController } from './courses/courses.controller'
import { CoursesService } from './courses/courses.service'

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class EducationModule {}
