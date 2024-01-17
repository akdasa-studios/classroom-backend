import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { CoursesService } from './courses.service'
import { CourseDto, CreateCourseDto, FindCourseDto, FromEntity, UpdateCourseDto } from './dto'
import { ApiOkResponse } from '@nestjs/swagger'


@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService
  ) {}

  @Post()
  create(
    @Body() createCourseDto: CreateCourseDto
  ) {
    return this.coursesService.create(createCourseDto)
  }

  @Get()
  @ApiOkResponse({
    description: 'The course records',
    type: CourseDto,
    isArray: true
  })
  async find(
    @Query() query: FindCourseDto,
  ): Promise<CourseDto[]> {
    return FromEntity(
      await this.coursesService.findByTitle(query.title)
    )
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.coursesService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return this.coursesService.update(+id, updateCourseDto)
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.coursesService.remove(+id)
  }
}
