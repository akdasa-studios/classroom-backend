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
    // TODO: check if group belongs to the course
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
      applicant:   { id: enrollment.applicant.id, name: enrollment.applicant.name, avatarUrl: enrollment.applicant.avatarUrl },
      course:      { id: enrollment.course.id,    title: enrollment.course.title },
      group:       enrollment.group ? { id: enrollment.group.id, name: enrollment.group.name } : undefined,
      status:      enrollment.status
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get enrollments list.' })
  @ApiOkResponse({ type: GetEnrollmentsResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  public async findAll(): Promise<GetEnrollmentsResponse> {
    return { items: (await this.enrollmentsService.findAll()).map(x => ({
      id: x.id,
      status: x.status,
      applicant: { id: x.applicant.id, name:  x.applicant.name, avatarUrl: x.applicant.avatarUrl },
      course:    { id: x.course.id,    title: x.course.title },
      group:     x.group ? { id: x.group.id, name: x.group.name } : undefined,
    })) }
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
    // TODO: check ir group belongs ti the course
    console.log(request)
    await this.enrollmentsService.update({
      id:     id,
      course: { id: request.courseId },
      group:  { id: request.groupId },
      status: request.status
    })
    return new UpdateEnrollmentResponse()
  }
}
