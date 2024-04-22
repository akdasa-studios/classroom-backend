import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from './roles.entity'
import { In, Repository } from 'typeorm'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) { }

  async create(request: Partial<Role>): Promise<Role> {
    return await this.rolesRepository.save([request])[0]
  }

  async findOne(id: string) {
    return await this.rolesRepository.findOneBy({id})
  }

  async findAll() {
    return await this.rolesRepository.find()
  }

  async update(id: string, request: Partial<Role>) {
    return await this.rolesRepository.update(id, request)
  }

  async findMany(id: string[]) {
    return await this.rolesRepository.find({ where: { id: In([...id || []]) } })
  }
}
