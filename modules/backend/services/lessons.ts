import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Lesson } from '@classroom/backend/entities'
import { EntitiesService } from '@classroom/backend/utils/entities.service'

@Injectable()
export class LessonsService extends EntitiesService<Lesson> {
  constructor(
    @InjectRepository(Lesson) repository: Repository<Lesson>,
  ) {
    super(repository)
  }
}

