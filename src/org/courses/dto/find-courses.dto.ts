import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsOptional } from 'class-validator'


export class FindCourseDto {
  @ApiProperty({
    required: false,
    description: 'Title of a course'
  })
  @IsOptional()
  @Type(() => String)
  title?: string

  // @ApiProperty({
  //   required: false,
  //   description: ''
  // })
  // @IsOptional()
  // @Type(() => Number)
  // page?: number | undefined
}
