import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Course } from '@classroom/backend/entities'
import { EntitiesService } from '@classroom/backend/utils/entities.service'

@Injectable()
export class CoursesService extends EntitiesService<Course> {
  constructor(
    @InjectRepository(Course) repository: Repository<Course>,
  ) {
    super(repository)
  }
}

