import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { DeepPartial, Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(
    fields: Partial<User>
  ): User {
    const user = new User()
    user.name = fields.name
    user.email = fields.email
    user.roles = fields.roles
    user.status = fields.status ?? 'invited'
    user.title = fields.title
    user.department = fields.department
    return this.usersRepository.create(user)
  }

  async save(
    user: User
  ) {
    await this.usersRepository.save(user)
  }

  public async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOne(userId: string) {
    return this.usersRepository.findOneBy({id: userId})
  }


  // async update(
  //   userId: string,
  //   fields: Partial<User>
  // ) {
  //   return this.usersRepository.(
  //     { id: userId },
  //     { ...fields }
  //   )
  // }

  remove(userId: number) {
    return `This action removes a #${userId} role`
  }
}
