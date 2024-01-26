import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './users.dto.create'
import { UpdateUserDto } from './users.dto.update'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Repository } from 'typeorm'
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate'
import { UserPaginateConfig } from './users.paginate'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createCourseDto: CreateUserDto) {
    const result = await this.usersRepository.save([createCourseDto])
    console.log(result)

  }

  public async findAll(
    query: PaginateQuery
  ): Promise<Paginated<User>> {
    return await paginate(
      query, this.usersRepository, UserPaginateConfig)
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({id})
  }


  update(id: number, updateCourseDto: UpdateUserDto) {
    return `This action updates a #${id} role`
  }

  remove(id: number) {
    return `This action removes a #${id} role`
  }
}
