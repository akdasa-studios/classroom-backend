import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated } from 'nestjs-paginate'
import { RolePaginateConfig } from './roles.paginate'
import { RolesService } from './roles.service'
import { Role } from './roles.entity'
import { CreateRoleDto } from './roles.dto.create'
import { UpdateRoleDto } from './roles.dto.update'

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService
  ) {}

  @Post()
  create(
    @Body() createRoleDto: CreateRoleDto
  ) {
    return this.rolesService.create(createRoleDto)
  }

  @Get()
  @ApiOkPaginatedResponse(Role, RolePaginateConfig)
  @ApiPaginationQuery(RolePaginateConfig)
  public async findAll(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<Role>> {
    return await this.rolesService.findAll(query)
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.rolesService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.rolesService.update(+id, updateRoleDto)
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.rolesService.remove(+id)
  }
}
