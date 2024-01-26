import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OrganizationModule } from './org/organization.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from './org/courses/entities/course.entity'
import { Role } from './org/roles/entities/role.entity'


@Module({
  imports: [
    OrganizationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'classroom',
      password: 'classroom',
      database: 'classroom',
      entities: [Course, Role],
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
