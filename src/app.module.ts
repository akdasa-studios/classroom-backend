import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { JwtModule } from '@nestjs/jwt'
import { Course, Enrollment, Group, Lesson, Role, Session, User } from '@classroom/admin/entities'
import { AuthService, CoursesService, EnrollmentsService, GroupsService, LessonsService, RolesService, SessionsService, UsersService } from '@classroom/admin/services'
import { AuthController, CoursesController, EnrollmentsController, GroupsController, LessonsController, RolesController, UsersController, MediaController, ProfileController } from "@classroom/admin/controllers/v1"
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { jwtConstants } from "./configs"
import { ConfigModule, ConfigService } from "@nestjs/config"

const ENTITIES = [Course, Role, User, Group, Enrollment, Lesson, Session]


@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '20s' },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: +configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'classroom'),
        password: configService.get<string>('DATABASE_PASSWORD', 'classroom'),
        database: configService.get<string>('DATABASE_NAME', 'classroom'),
        entities: ENTITIES,
        synchronize: true,
      }),
      inject: [ConfigService],
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
    ProfileController,
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
    SessionsService
    // IsRolesExist,
    //, IsUserExistConstraint
  ],
})
export class AppModule { }
