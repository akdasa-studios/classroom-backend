import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger'
import { EnrollmentsService } from '@classroom/admin/services'
import { CreateEnrollmentRequest, CreateEnrollmentResponse, GetEnrollmentResponse, GetEnrollmentsResponse, UpdateEnrollmentRequest, UpdateEnrollmentResponse } from '@classroom/admin/protocol'

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(
    private readonly enrollmentsService: EnrollmentsService
  ) {}

  @Post()
  @ApiBody({ type: CreateEnrollmentRequest })
  @ApiOperation({ summary: 'Create a new enrollment.' })
  @ApiCreatedResponse({ type: CreateEnrollmentResponse, description: 'The enrollment has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(
    @Body() request: CreateEnrollmentRequest
  ): Promise<CreateEnrollmentResponse> {
    const userId = '';
    this.enrollmentsService.create({ 
      applicant:   { id: userId },
      group:       { id: request.groupId },
      course:      { id: request.courseId },
      status:      'new',
    })
    return new CreateEnrollmentResponse()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get enrollment information.' })
  @ApiOkResponse({ type: GetEnrollmentResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findOne(
    @Param('id') id: string
  ): Promise<GetEnrollmentResponse> {
    const enrollment = await this.enrollmentsService.findOne(id)
    return {
      id:          enrollment.id,
      applicantId: enrollment.applicant.id,
      courseId:    enrollment.course.id,
      groupId:     enrollment.group.id,
      status:      enrollment.status
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get enrollments list.' })
  @ApiOkResponse({ type: GetEnrollmentsResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findAll() {
    return { data: await this.enrollmentsService.findAll() }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update enrollment.' })
  @ApiBody({ type: UpdateEnrollmentRequest })
  @ApiOkResponse({ type: UpdateEnrollmentResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateEnrollmentRequest
  ): Promise<UpdateEnrollmentResponse> {
    await this.enrollmentsService.update(id, {
      course: { id: request.courseId },
      group:  { id: request.groupId }
    })
    return new UpdateEnrollmentResponse()
  }
}
