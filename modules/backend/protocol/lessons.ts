import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import * as protocol from '@classroom/protocol/LessonsService'

// -- Models ----------------------------------------------------------------

export class Lesson implements protocol.Lesson {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  id: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  courseId: string

  @ApiProperty({ example: 'Bhakti-shastri' })
  title: string

  @ApiProperty({ example: 'One year couse ...' })
  description: string
}


// -- Create ----------------------------------------------------------------

export class CreateLessonRequest implements protocol.CreateLessonRequest {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  courseId: string

  @ApiProperty({ example: 'Bhakti-shastri' })
  @IsNotEmpty()
  title: string

  @ApiProperty({ example: 'One year couse ...' })
  @IsNotEmpty()
  description: string
}

export class CreateLessonResponse implements protocol.CreateLessonResponse {
}


// -- Get -------------------------------------------------------------------

export class GetLessonResponse implements protocol.GetLessonResponse {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  id: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  courseId: string

  @ApiProperty({ example: 'Bhakti-shastri' })
  title: string

  @ApiProperty({ example: 'One year couse ...' })
  description: string
}


export class GetLessonsResponse implements protocol.GetLessonsResponse {
  @ApiProperty({ type: Lesson, isArray: true })
  items: Lesson[]
}


// -- Update ----------------------------------------------------------------

export class UpdateLessonRequest implements protocol.UpdateLessonRequest {
  @ApiPropertyOptional({ example: 'Bhakti-shastri' })
  title?: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  description?: string
}

export class UpdateLessonResponse implements protocol.UpdateLessonResponse {
}

