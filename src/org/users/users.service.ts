import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { DeepPartial, In, Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private rolesRepository: Repository<User>,
  ) { }

  async create(request: DeepPartial<User>): Promise<User> {
    return await this.rolesRepository.save([request])[0]
  }

  async findOne(id: string) {
    return await this.rolesRepository.findOneBy({id})
  }

  async findAll() {
    return await this.rolesRepository.find()
  }

  async update(id: string, request: DeepPartial<User>) {
    console.log(id, request)
    return await this.rolesRepository.update(id, request)
  }

  async findMany(id: string[]) {
    return await this.rolesRepository.find({ where: { id: In([...id || []]) } })
  }
}

