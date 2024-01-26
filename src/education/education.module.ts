import { Module } from '@nestjs/common'
import { CoursesModule } from './courses/courses.module'
import { RolesModule } from './roles/roles.module'

@Module({
  imports: [CoursesModule, RolesModule],
})
export class EducationModule {}
