import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated } from 'nestjs-paginate'
import { UserPaginateConfig } from './users.paginate'
import { UsersService } from './users.service'
import { User } from './users.entity'
import { CreateUserDto } from './users.dto.create'
import { UpdateUserDto } from './users.dto.update'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  create(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOkPaginatedResponse(User, UserPaginateConfig)
  @ApiPaginationQuery(UserPaginateConfig)
  public async findAll(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<User>> {
    return await this.usersService.findAll(query)
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.usersService.remove(+id)
  }
}
