import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger'
import { EnrollmentsService } from '@classroom/backend/services'
import { CreateEnrollmentRequest, CreateEnrollmentResponse, GetEnrollmentResponse, GetEnrollmentsResponse, UpdateEnrollmentRequest, UpdateEnrollmentResponse } from '@classroom/backend/protocol'
import { AuthGuard } from '@classroom/backend/guards'
import { AuthScope, AuthenticatedUserId } from '@classroom/backend/decorators'

@ApiTags('Enrollments')
@Controller('enrollments')
@UseGuards(AuthGuard)
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
    @Body() request: CreateEnrollmentRequest,
    @AuthenticatedUserId() userId: string,
  ): Promise<CreateEnrollmentResponse> {
    // TODO: check if group belongs to the course
    this.enrollmentsService.create({
      id:          request?.id,
      applicant:   { id: userId },
      group:       { id: request.groupId },
      course:      { id: request.courseId },
      status:      'pending',
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
  public async findAll(
    @AuthScope() scope: string,
    @AuthenticatedUserId() userId: string
  ): Promise<GetEnrollmentsResponse> {
    const items = scope === 'admin'
      ? await this.enrollmentsService.findAll({ relations: { applicant: true, course: true, group: true } })
      : await this.enrollmentsService.findAllOfUser(userId)

    return {
      items: items.map(x => ({
        id:         x.id,
        status:     x.status,
        group:      x.group ? { id: x.group.id, name: x.group.name } : undefined,
        declinedBy: x.declinedById ? x.declinedById : undefined,
        applicant:  { id: x.applicant.id, name:  x.applicant.name, avatarUrl: x.applicant.avatarUrl },
        course:     { id: x.course.id,    title: x.course.title },
      }))
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update enrollment.' })
  @ApiBody({ type: UpdateEnrollmentRequest })
  @ApiOkResponse({ type: UpdateEnrollmentResponse })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() request: UpdateEnrollmentRequest,
    @AuthenticatedUserId() userId: string,
  ): Promise<UpdateEnrollmentResponse> {
    // TODO: check ir group belongs ti the course
    await this.enrollmentsService.update({
      id:     id,
      course: request.courseId ? { id: request.courseId } : undefined,
      group:  request.groupId ? { id: request.groupId } : undefined,
      status: request.status,
      declinedBy: request.status === 'declined' ? { id: userId } : undefined
    })

    return new UpdateEnrollmentResponse()
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete enrollment.' })
  async remove(
    @Param('id') id: string
  ): Promise<void> {
    await this.enrollmentsService.archive(id)
  }
}
