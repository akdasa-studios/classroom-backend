import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Course, Enrollment, Group, Lesson, Role, User } from '@classroom/admin/entities'
import { CoursesService, EnrollmentsService, GroupsService, LessonsService, RolesService, UsersService } from '@classroom/admin/services'
import { CoursesController, EnrollmentsController, GroupsController, LessonsController, RolesController, UsersController } from "@classroom/admin/controllers/v1"

const ENTITIES = [Course, Role, User, Group, Enrollment, Lesson]


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'classroom',
      password: 'classroom',
      database: 'classroom',
      entities: ENTITIES,
      synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    }),
    TypeOrmModule.forFeature(ENTITIES)
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
    RolesService,
    UsersService,
    CoursesService,
    EnrollmentsService,
    GroupsService,
    LessonsService,
    // IsRolesExist,
    //, IsUserExistConstraint
  ],
})
export class AppModule { }
