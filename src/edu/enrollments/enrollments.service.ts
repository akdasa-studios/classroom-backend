import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Enrollment } from './enrollments.entity'
import { Repository } from 'typeorm'
import { EntitiesService } from 'src/utils/entities.service'

@Injectable()
export class EnrollmentsService extends EntitiesService<Enrollment> {
  constructor(
    @InjectRepository(Enrollment) repository: Repository<Enrollment>,
  ) {
    super(repository)
  }
}

