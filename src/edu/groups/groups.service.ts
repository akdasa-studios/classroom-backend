import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Group } from './groups.entity'
import { Repository } from 'typeorm'
import { EntitiesService } from 'src/utils/entities.service'

@Injectable()
export class GroupsService extends EntitiesService<Group> {
  constructor(
    @InjectRepository(Group) repository: Repository<Group>,
  ) {
    super(repository)
  }
}
