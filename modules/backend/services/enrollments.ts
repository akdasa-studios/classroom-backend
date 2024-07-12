import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { Enrollment } from '@classroom/backend/entities'
import { EntitiesService } from '@classroom/backend/utils/entities.service'

@Injectable()
export class EnrollmentsService extends EntitiesService<Enrollment> {
  constructor(
    @InjectRepository(Enrollment) repository: Repository<Enrollment>,
  ) {
    super(repository)
  }

  async archive(id: string) {
    return await this.repository.update(id, { archivedAt: new Date() } )
  }

  async findAllOfUser(userId: string) {
    return await this.repository.find({
      relations: {
        applicant: true,
        course: true,
        group: true,
      },
      where: {
        applicant: { id: userId },
        archivedAt: IsNull()
      }
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

