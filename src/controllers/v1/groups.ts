import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UnprocessableEntityException } from '@nestjs/common'
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiForbiddenResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import { GroupsService } from '@classroom/admin/services'
import { CreateGroupRequest, CreateGroupResponse, GetGroupResponse, GetGroupsResponse, UpdateGroupRequest, UpdateGroupResponse } from '@classroom/admin/protocol'
import { ValidationError } from '@classroom/admin/utils/entities.service'

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService
  ) {}

  @Post()
  @ApiBody({ type: CreateGroupRequest })
  @ApiOperation({ summary: 'Create a new group.' })
  @ApiCreatedResponse({ description: 'The group has been successfully created.', type: CreateGroupResponse,  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnprocessableEntityResponse({ description: '422', type: UnprocessableEntityException })
  async create(
    @Body() request: CreateGroupRequest
  ): Promise<CreateGroupResponse> {
    try {
      await this.groupsService.create({
        name:        request.name,
        description: request.description,
        startsAt:    request.startsAt,
        leaderId:    request.leaderId,
      })
      return new CreateGroupResponse()
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new UnprocessableEntityException(err)
      }
      throw err
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get group information.' })
  @ApiOkResponse({ type: GetGroupResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findOne(
    @Param('id') id: string
  ): Promise<GetGroupResponse> {
    const group = await this.groupsService.findOne(id)
    if (group) { return group }
    throw new NotFoundException()
  }

  @Get()
  @ApiOperation({ summary: 'Get groups list.' })
  @ApiOkResponse({ type: GetGroupsResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findAll() {
    return { data: await this.groupsService.findAll() }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update group.' })
  @ApiBody({ type: UpdateGroupRequest })
  @ApiOkResponse({ type: UpdateGroupResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateGroupRequest
  ): Promise<UpdateGroupResponse> {
    await this.groupsService.update({ id, ...request })
    return new UpdateGroupResponse()
  }
}
