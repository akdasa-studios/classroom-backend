import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated } from 'nestjs-paginate'
import { CoursePaginateConfig } from './course.paginate'
import { CoursesService } from './courses.service'
import { CreateCourseDto, UpdateCourseDto } from './dto'
import { Course } from './entities/course.entity'

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
  @ApiOkPaginatedResponse(Course, CoursePaginateConfig)
  @ApiPaginationQuery(CoursePaginateConfig)
  public async findAll(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<Course>> {
    return await this.coursesService.findAll(query)
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
