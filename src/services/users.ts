import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@classroom/admin/entities'
import { EntitiesService } from '@classroom/admin/utils/entities.service'

@Injectable()
export class UsersService extends EntitiesService<User> {
  constructor(
    @InjectRepository(User) repository: Repository<User>,
  ) {
    super(repository)
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email })
  }
}

