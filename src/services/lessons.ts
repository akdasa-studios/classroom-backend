import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Lesson } from '@classroom/admin/entities'
import { EntitiesService } from '@classroom/admin/utils/entities.service'

@Injectable()
export class LessonsService extends EntitiesService<Lesson> {
  constructor(
    @InjectRepository(Lesson) repository: Repository<Lesson>,
  ) {
    super(repository)
  }
}

