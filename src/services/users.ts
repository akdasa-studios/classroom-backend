import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArrayContainedBy, Repository, Raw } from 'typeorm'
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

  async findAllManagers(name: string) {
    const adminPermissions = [
      'org-roles-manage',
      'org-users-manage',
      'org-settings-manage',

      'edu-courses-manage',
      'edu-classes-manage',
      'edu-students-manage',
      'edu-homework-manage',

      'fin-reports-access',
      'fin-payments-manage',
    ]
    return await this.repository.find({
      relations: { roles: true },
      where: {
        name: name ?Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, { value: `%${name}%`, }) : undefined,
        roles: { permissions: ArrayContainedBy(adminPermissions) }
      }
    })
  }
}

