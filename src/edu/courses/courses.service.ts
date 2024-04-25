import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from './courses.entity'
import { Repository } from 'typeorm'
import { EntitiesService } from 'src/utils/entities.service'

@Injectable()
export class CoursesService extends EntitiesService<Course> {
  constructor(
    @InjectRepository(Course) repository: Repository<Course>,
  ) {
    super(repository)
  }
}

