import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService
  ) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiQuery({ name: "title", type: String, description: "A parameter. Optional", required: false })
  @ApiQuery({ name: "page",  type: Number, description: "A parameter. Optional", required: false })
  async find(
    @Query('title') title?: string,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number = 11,
  ) {
    console.log(title, page)
    return await this.coursesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string
  ) {
    return this.coursesService.remove(+id);
  }
}
