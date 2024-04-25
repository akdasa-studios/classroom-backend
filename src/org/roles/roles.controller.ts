import { Body, Controller, Get, Param, Patch, Post, UnprocessableEntityException } from '@nestjs/common'
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger'
import { RolesService } from './roles.service'
import { CreateRoleRequest, CreateRoleResponse, GetRoleResponse, GetRolesResponse, UpdateRoleRequest, UpdateRoleResponse } from './roles.protocol'
import { ValidationError } from '@/utils/entities.service'

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService
  ) {}

  @Post()
  @ApiBody({ type: CreateRoleRequest })
  @ApiOperation({ summary: 'Create a new role.' })
  @ApiCreatedResponse({ type: CreateRoleResponse, description: 'The role has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(
    @Body() request: CreateRoleRequest
  ): Promise<CreateRoleResponse> {
    try {
      const role = await this.rolesService.create(request)
      return { id: role.id }
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new UnprocessableEntityException(err)
      }
      throw err
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role information.' })
  @ApiOkResponse({ type: GetRoleResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findOne(
    @Param('id') id: string
  ): Promise<GetRoleResponse> {
    return await this.rolesService.findOne(id)
  }

  @Get()
  @ApiOperation({ summary: 'Get roles list.' })
  @ApiOkResponse({ type: GetRolesResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findAll() {
    return { data: await this.rolesService.findAll() }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update role.' })
  @ApiBody({ type: UpdateRoleRequest })
  @ApiOkResponse({ type: UpdateRoleResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateRoleRequest
  ): Promise<UpdateRoleResponse> {
    await this.rolesService.update(id, request)
    return new UpdateRoleResponse()
  }
}
