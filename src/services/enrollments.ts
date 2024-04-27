import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Enrollment } from '@classroom/admin/entities'
import { EntitiesService } from '@classroom/admin/utils/entities.service'

@Injectable()
export class EnrollmentsService extends EntitiesService<Enrollment> {
  constructor(
    @InjectRepository(Enrollment) repository: Repository<Enrollment>,
  ) {
    super(repository)
  }
}

