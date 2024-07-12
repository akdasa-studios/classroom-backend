import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from '@classroom/backend/entities'
import { EntitiesService } from '@classroom/backend/utils/entities.service'

@Injectable()
export class RolesService extends EntitiesService<Role> {
  constructor(
    @InjectRepository(Role) repository: Repository<Role>,
  ) {
    super(repository)
  }
}

