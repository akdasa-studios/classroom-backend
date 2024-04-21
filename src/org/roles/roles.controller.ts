import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleRequest, CreateRoleResponse, GetRoleResponse } from './roles.protocol'

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService
  ) {}

  @Post()
  async create(
    @Body() request: CreateRoleRequest
  ): Promise<CreateRoleResponse> {
    this.rolesService.create(request)
    return new CreateRoleResponse()
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<GetRoleResponse> {
    return await this.rolesService.findOne(id)
  }

  @Get()
  public async findAll() {
    return { data: await this.rolesService.findAll() }
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRoleDto: UpdateRoleDto
  // ) {
  //   return this.rolesService.update(+id, updateRoleDto)
  // }
  //
  // @Delete(':id')
  // remove(
  //   @Param('id') id: string
  // ) {
  //   return this.rolesService.remove(+id)
  // }
}
