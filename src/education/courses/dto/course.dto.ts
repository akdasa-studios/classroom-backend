import { ApiProperty } from '@nestjs/swagger'
import { instanceToPlain } from 'class-transformer'
import { Course } from '../entities/course.entity'

export class CourseDto {
  @ApiProperty({ description: 'ID' })
  id: string

  @ApiProperty({ description: 'Title' })
  title: string

  @ApiProperty({ description: 'Summary' })
  summary: string

  @ApiProperty({ description: 'Image url' })
  coverUrl: string
}


export function FromEntity(entity: Course | Course[]) {
  return instanceToPlain(entity) as CourseDto[]
}