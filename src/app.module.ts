import { Module } from '@nestjs/common'
import { OrganizationModule } from './org/organization.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './org/roles/roles.entity'
import { User } from './org/users/users.entity'
import { EducationModule } from './edu/education.module'
import { Course } from './edu/courses/courses.entity'


@Module({
  imports: [
    OrganizationModule,
    EducationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'classroom',
      password: 'classroom',
      database: 'classroom',
      entities: [Course, Role, User],
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
    }),
  ],
  providers: [],
})
export class AppModule { }
