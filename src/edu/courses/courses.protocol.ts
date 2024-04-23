import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import * as protocol from '@classroom/protocol/AccountsService'

// -- Models ----------------------------------------------------------------

export class Course implements protocol.Course {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4, { each:true })
  id: string

  @ApiProperty({ example: 'Bhakti-shastri' })
  title: string

  @ApiProperty({ example: 'Become a pandit' })
  subtitle: string

  @ApiProperty({ example: 'One year couse ...' })
  description: string

  @ApiProperty({ example: 'https://images.com/cover.png' })
  coverImageUrl: string
}


// -- Create ----------------------------------------------------------------

export class CreateCourseRequest implements protocol.CreateCourseRequest {
  @ApiProperty({ example: 'Bhakti-shastri' })
  @IsNotEmpty()
  title: string

  @ApiProperty({ example: 'Become a pandit' })
  @IsNotEmpty()
  subtitle: string

  @ApiProperty({ example: 'One year couse ...' })
  @IsNotEmpty()
  description: string

  @ApiProperty({ example: 'https://images.com/cover.png' })
  @IsNotEmpty()
  coverImageUrl: string
}

export class CreateCourseResponse implements protocol.CreateCourseResponse {
}


// -- Get -------------------------------------------------------------------

export class GetCourseResponse implements protocol.GetCourseResponse {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4, { each:true })
  id: string

  @ApiProperty({ example: 'Bhakti-shastri' })
  title: string

  @ApiProperty({ example: 'Become a pandit' })
  subtitle: string

  @ApiProperty({ example: 'One year couse ...' })
  description: string

  @ApiProperty({ example: 'https://images.com/cover.png' })
  coverImageUrl: string
}


export class GetCoursesResponse implements protocol.GetCoursesResponse {
  @ApiProperty({ type: Course, isArray: true })
  items: Course[]
}


// -- Update ----------------------------------------------------------------

export class UpdateCourseRequest implements protocol.UpdateCourseRequest {
  @ApiPropertyOptional({ example: 'Bhakti-shastri' })
  title?: string

  @ApiPropertyOptional({ example: 'Become a pandit' })
  subtitle?: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  description?: string

  @ApiPropertyOptional({ example: 'https://images.com/cover.png' })
  coverImageUrl?: string
}

export class UpdateCourseResponse implements protocol.UpdateCourseResponse {
}

