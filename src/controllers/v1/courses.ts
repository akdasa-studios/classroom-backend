import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger'
import { CoursesService } from '@classroom/admin/services'
import { CreateCourseRequest, CreateCourseResponse, GetCourseResponse, GetCoursesResponse, UpdateCourseRequest, UpdateCourseResponse } from '@classroom/admin/protocol'

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService
  ) {}

  @Post()
  @ApiBody({ type: CreateCourseRequest })
  @ApiOperation({ summary: 'Create a new course.' })
  @ApiCreatedResponse({ type: CreateCourseResponse, description: 'The course has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(
    @Body() request: CreateCourseRequest
  ): Promise<CreateCourseResponse> {
    this.coursesService.create(request)
    return new CreateCourseResponse()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course information.' })
  @ApiOkResponse({ type: GetCourseResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findOne(
    @Param('id') id: string
  ): Promise<GetCourseResponse> {
    return await this.coursesService.findOne(id)
  }

  @Get()
  @ApiOperation({ summary: 'Get courses list.' })
  @ApiOkResponse({ type: GetCoursesResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findAll(): Promise<GetCoursesResponse> {
    return { items: await this.coursesService.findAll() }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update course.' })
  @ApiBody({ type: UpdateCourseRequest })
  @ApiOkResponse({ type: UpdateCourseResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateCourseRequest
  ): Promise<UpdateCourseResponse> {
    await this.coursesService.update({ id: id, ...request })
    return new UpdateCourseResponse()
  }
}
