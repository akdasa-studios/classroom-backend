import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, UnprocessableEntityException } from '@nestjs/common'
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger'
import { UsersService } from '@classroom/admin/services'
import { CreateUserRequest, CreateUserResponse, GetUserResponse, GetUsersResponse, UpdateUserRequest, UpdateUserResponse } from '@classroom/admin/protocol'
import { ValidationError } from '@classroom/admin/utils/entities.service'

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
    try {
      const entity = await this.usersService.create({
        ...request,
        status: 'invited'
      })
      return { id: entity.id }
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new UnprocessableEntityException(err)
      }
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user information.' })
  @ApiOkResponse({ type: GetUserResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findOne(
    @Param('id') id: string
  ): Promise<GetUserResponse> {
    const entity = await this.usersService.findOne(id)
    if (!entity) {
      throw new NotFoundException()
    } else {
      return entity
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get users list.' })
  @ApiOkResponse({ type: GetUsersResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findAll(
    @Query('query') query?: string
  ): Promise<GetUsersResponse> {
    const users = await this.usersService.findAllManagers(query)
    return { items: users }
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
    await this.usersService.update({
      ...request,
      id: id,
      roles: request.roleIds ? request.roleIds.map(x => ({ id: x })) : undefined,
    })
    return new UpdateUserResponse()
  }
}
