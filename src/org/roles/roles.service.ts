import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from './roles.entity'
import { FindManyOptions, In, Repository } from 'typeorm'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async create(request: Partial<Role>): Promise<Role> {
    return await this.rolesRepository.save([request])[0]
  }

  async findOne(id: string) {
    return await this.rolesRepository.findOneBy({id})
  }

  async findAll() {
    return await this.rolesRepository.find()
  }

  async findMany(id: string[]) {
    return await this.rolesRepository.find({ where: { id: In([...id || []]) } })
  }

  // update(id: string, updateCourseDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} role`
  // }
}
