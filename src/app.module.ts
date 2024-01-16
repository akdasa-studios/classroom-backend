import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EducationModule } from './education/education.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from './education/courses/entities/course.entity';


@Module({
  imports: [
    EducationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'classroom',
      password: 'classroom',
      database: 'classroom',
      entities: [Course],
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
