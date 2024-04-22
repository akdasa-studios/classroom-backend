import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserRequest, CreateUserResponse, GetUserResponse, GetUsersResponse, UpdateUserRequest, UpdateUserResponse } from './users.protocol'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Post()
  @ApiBody({ type: CreateUserRequest })
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiCreatedResponse({ type: CreateUserResponse, description: 'The user has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(
    @Body() request: CreateUserRequest
  ): Promise<CreateUserResponse> {
    // TODO: fail if user with same email is already exist
    // TODO: fail if no roles provided
    // TODO: fail if invalid role id provided
    // TODO: fail if invalid email provided
    // TODO: ckeck users permission to create
    this.usersService.create({
      ...request,
      roles: request.roles.map(x => ({ id: x}))
    })
    return new CreateUserResponse()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user information.' })
  @ApiOkResponse({ type: GetUserResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findOne(
    @Param('id') id: string
  ): Promise<GetUserResponse> {
    const user = await this.usersService.findOne(id)
    return {
      ...user,
      roles: user.roles.map(x => x.id)
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get users list.' })
  @ApiOkResponse({ type: GetUsersResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findAll() {
    const users = await this.usersService.findAll() 
    return { 
      data: users.map(user => ({
        ...user,
        roles: user.roles.map(r => r.id)
      }))
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user.' })
  @ApiBody({ type: UpdateUserRequest })
  @ApiOkResponse({ type: UpdateUserResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    this.usersService.update(id, {
      ...request,
      roles: request.roles ? request.roles.map(x => ({ id: x})) : undefined
    })
    return new UpdateUserResponse()
  }
}
