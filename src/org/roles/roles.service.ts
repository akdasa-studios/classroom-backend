import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { Repository } from 'typeorm'
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate'
import { RolePaginateConfig } from './role.paginate'

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private coursesRepository: Repository<Role>,
  ) {}

  async create(createCourseDto: CreateRoleDto) {
    const result = await this.coursesRepository.save([createCourseDto])
    console.log(result)

  }

  public async findAll(
    query: PaginateQuery
  ): Promise<Paginated<Role>> {
    return await paginate(
      query, this.coursesRepository, RolePaginateConfig)
  }

  findOne(id: string) {
    return this.coursesRepository.findOneBy({id})
  }


  update(id: number, updateCourseDto: UpdateRoleDto) {
    return `This action updates a #${id} role`
  }

  remove(id: number) {
    return `This action removes a #${id} role`
  }
}
