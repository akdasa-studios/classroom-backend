import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from '@nestjs/jwt'
import { Course, Enrollment, Group, Lesson, Role, User } from '@classroom/admin/entities'
import { AuthService, CoursesService, EnrollmentsService, GroupsService, LessonsService, RolesService, UsersService } from '@classroom/admin/services'
import { AuthController, CoursesController, EnrollmentsController, GroupsController, LessonsController, RolesController, UsersController, MediaController } from "@classroom/admin/controllers/v1"
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { jwtConstants } from "./configs"

const ENTITIES = [Course, Role, User, Group, Enrollment, Lesson]


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'classroom',
      password: 'classroom',
      database: 'classroom',
      entities: ENTITIES,
      synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      logging: true,
    }),
    TypeOrmModule.forFeature(ENTITIES),
    MulterModule.register({
      dest: './upload',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'upload'),
      serveRoot: '/media'
    }),
  ],
  controllers: [
    AuthController,
    RolesController,
    UsersController,
    CoursesController,
    EnrollmentsController,
    GroupsController,
    LessonsController,
    MediaController,
  ],
  providers: [
    AuthService,
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
