import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from './roles.entity'
import { Repository } from 'typeorm'
import { EntitiesService } from '../../utils/entities.service'

@Injectable()
export class RolesService extends EntitiesService<Role> {
  constructor(
    @InjectRepository(Role) repository: Repository<Role>,
  ) {
    super(repository)
  }
}

