import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Raw } from 'typeorm'
import { Group } from '@classroom/backend/entities'
import { EntitiesService } from '@classroom/backend/utils/entities.service'

@Injectable()
export class GroupsService extends EntitiesService<Group> {
  constructor(
    @InjectRepository(Group) repository: Repository<Group>,
  ) {
    super(repository)
  }

  async findByNameAndCourse(
    name: string, courseId: string
  ) {
    return await this.repository.find({
      relations: {
        course: true,
      },
      where: {
        name: name ? Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, { value: `%${name}%`, }) : undefined,
        course: { id: courseId }
      }
    })
  }
}
