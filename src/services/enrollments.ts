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

  async findAll() {
    return await this.repository.find({
      relations: { 
        applicant: true,
        course: true,
        group: true,
      },
    })
  }

  async findOne(id: string) {
    return await this.repository.findOne({ 
      where: { id: id },
      relations: {
        applicant: true,
        course: true,
        group: true,
      }
    })
  }
}

