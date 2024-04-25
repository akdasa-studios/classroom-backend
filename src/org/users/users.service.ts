import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Repository } from 'typeorm'
import { EntitiesService } from '../../utils/entities.service'

@Injectable()
export class UsersService extends EntitiesService<User> {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
  ) {
    super(repository)
  }
}

