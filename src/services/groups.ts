import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Group } from '@classroom/admin/entities'
import { EntitiesService } from '@classroom/admin/utils/entities.service'

@Injectable()
export class GroupsService extends EntitiesService<Group> {
  constructor(
    @InjectRepository(Group) repository: Repository<Group>,
  ) {
    super(repository)
  }
}
