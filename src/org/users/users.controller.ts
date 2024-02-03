import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserResponse, GetUserResponse, GetUsersResponse, UpdateUserRequest, UpdateUserResponse } from 'submodules/protocol/lib/user'
import { RolesService } from '../roles/roles.service'
import { CreateUserRequest, InvalidResponse } from './users.dto'
import { UsersService } from './users.service'


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService
  ) { }

  @Post()
  @ApiBody({ type: CreateUserRequest })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, type: InvalidResponse, description: 'Forbidden.'})
  @ApiResponse({ status: 409, type: InvalidResponse, description: 'A user with the same email already exists.'})
  async create(
    @Body() createUserRequest: CreateUserRequest
  ): Promise<CreateUserResponse> {
    // TODO: fail if user with same email is already exist
    // TODO: fail if no roles provided
    // TODO: fail if invalid role id provided
    // TODO: fail if invalid email provided
    // TODO: ckeck users permission to create
    const roles = await this.rolesService.findMany(createUserRequest.roles)
    console.log(createUserRequest)


    this.usersService.create({
      name: createUserRequest.name,
      email: createUserRequest.email,
      title: createUserRequest.title,
      department: createUserRequest.department,
      roles: roles,
    })
    return { success: true }
  }

  @Get()
  public async findAll(): Promise<GetUsersResponse> {
    const users = await this.usersService.findAll()
    return {
      data: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        title: user.title,
        department: user.department,
        roles: user.roles.map(x => x.id),
      }))
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GetUserResponse> {
    const user = await this.usersService.findOne(id)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      title: user.title,
      department: user.department,
      roles: user.roles.map(x => x.id),
    }
  }

  @Patch(':id')
  async update(
    @Param('id') userId: string,
    @Body() updateUserRequest: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    const user = await this.usersService.findOne(userId)
    const roles = await this.rolesService.findMany(updateUserRequest.roles)

    user.name = updateUserRequest.name ?? user.name
    user.email = updateUserRequest.email ?? user.email
    user.status = updateUserRequest.status ?? user.status
    user.title = updateUserRequest.title ?? user.title
    user.department = updateUserRequest.department ?? user.department
    user.roles = roles ?? user.roles

    await this.usersService.save(user)
    return { success: true }
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.usersService.remove(+id)
  }
}
