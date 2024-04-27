import { Test, TestingModule } from '@nestjs/testing'
import { inMemoryDataSource } from './data-source'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { Course, Enrollment, Group, Lesson, Role, User } from '@classroom/admin/entities'
import { CoursesService, EnrollmentsService, GroupsService, LessonsService, RolesService, UsersService } from '@classroom/admin/services'
import { CoursesController, EnrollmentsController, GroupsController, LessonsController, RolesController, UsersController } from "@classroom/admin/controllers/v1"

export const testingModule = async() => {
  const dataSource = await inMemoryDataSource()
  const app: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        name: 'default',
        synchronize: true,
      }),
      TypeOrmModule.forFeature([Course, Enrollment, Group, Lesson, Role, User])
    ],
    controllers: [
      RolesController,
      UsersController,
      CoursesController,
      EnrollmentsController,
      GroupsController,
      LessonsController
    ],
    providers: [
      CoursesService,
      EnrollmentsService,
      GroupsService,
      LessonsService,
      RolesService,
      UsersService
    ],
  })
    .overrideProvider(DataSource)
    .useValue(dataSource)
    .compile()
  return app
}
