import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Course } from '@classroom/admin/entities'
import { EntitiesService } from '@classroom/admin/utils/entities.service'

@Injectable()
export class CoursesService extends EntitiesService<Course> {
  constructor(
    @InjectRepository(Course) repository: Repository<Course>,
  ) {
    super(repository)
  }
}

