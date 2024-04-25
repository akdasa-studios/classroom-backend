import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'
import * as protocol from '@classroom/protocol/AccountsService'

// -- Models ----------------------------------------------------------------

const EnrollmentStatusValues = ['new', 'approved', 'declined', 'graduated'] as const
export type EnrollmentStatus = typeof EnrollmentStatusValues[number];

export class Enrollment implements protocol.Enrollment {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  id: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  applicantId: string

  @ApiPropertyOptional({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  groupId?: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  courseId: string

  @ApiProperty({
    enum: EnrollmentStatusValues 
  })
  status: EnrollmentStatus
}

// -- Create ----------------------------------------------------------------

export class CreateEnrollmentRequest implements protocol.CreateEnrollmentRequest {
  @ApiPropertyOptional({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  groupId?: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  courseId: string
}

export class CreateEnrollmentResponse implements protocol.CreateEnrollmentResponse {
}


// -- Get -------------------------------------------------------------------

export class GetEnrollmentResponse implements protocol.GetEnrollmentResponse {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4, { each:true })
  id: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4, { each:true })
  applicantId: string

  @ApiPropertyOptional({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4, { each:true })
  groupId?: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4, { each:true })
  courseId: string

  @ApiProperty({
    enum: EnrollmentStatusValues 
  })
  status: EnrollmentStatus
}


export class GetEnrollmentsResponse implements protocol.GetEnrollmentsResponse {
  @ApiProperty({ type: Enrollment, isArray: true })
  items: Enrollment[]
}


// -- Update ----------------------------------------------------------------

export class UpdateEnrollmentRequest implements protocol.UpdateEnrollmentRequest {
  @ApiPropertyOptional({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4, { each:true })
  groupId?: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4, { each:true })
  courseId?: string
}

export class UpdateEnrollmentResponse implements protocol.UpdateEnrollmentResponse {
}

