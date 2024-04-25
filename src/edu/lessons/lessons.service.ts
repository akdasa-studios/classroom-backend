import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Lesson } from './lessons.entity'
import { Repository } from 'typeorm'
import { EntitiesService } from 'src/utils/entities.service'

@Injectable()
export class LessonsService extends EntitiesService<Lesson> {
  constructor(
    @InjectRepository(Lesson) repository: Repository<Lesson>,
  ) {
    super(repository)
  }
}

