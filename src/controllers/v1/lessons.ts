import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger'
import { LessonsService } from '@classroom/admin/services'
import { CreateLessonRequest, CreateLessonResponse, GetLessonResponse, GetLessonsResponse, UpdateLessonRequest, UpdateLessonResponse } from '@classroom/admin/protocol'

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService
  ) {}

  @Post()
  @ApiBody({ type: CreateLessonRequest })
  @ApiOperation({ summary: 'Create a new lesson.' })
  @ApiCreatedResponse({ type: CreateLessonResponse, description: 'The lesson has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(
    @Body() request: CreateLessonRequest
  ): Promise<CreateLessonResponse> {
    this.lessonsService.create(request)
    return new CreateLessonResponse()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson information.' })
  @ApiOkResponse({ type: GetLessonResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findOne(
    @Param('id') id: string
  ): Promise<GetLessonResponse> {
    const lesson = await this.lessonsService.findOne(id)
    const { course, ...groupProperties } = lesson
    return {
      ...groupProperties,
      courseId: lesson.course.id
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get lessons list.' })
  @ApiOkResponse({ type: GetLessonsResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findAll() {
    return { data: await this.lessonsService.findAll() }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update lesson.' })
  @ApiBody({ type: UpdateLessonRequest })
  @ApiOkResponse({ type: UpdateLessonResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateLessonRequest
  ): Promise<UpdateLessonResponse> {
    await this.lessonsService.update(id, request)
    return new UpdateLessonResponse()
  }
}
