import { Injectable } from '@nestjs/common'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from './entities/course.entity'
import { Raw, Repository } from 'typeorm'
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate'
import { CoursePaginateConfig } from './course.paginate'

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course'
  }

  public async findAll(
    query: PaginateQuery
  ): Promise<Paginated<Course>> {
    return await paginate(
      query, this.coursesRepository, CoursePaginateConfig)
  }

  findOne(id: string) {
    return this.coursesRepository.findOneBy({id})
  }

  async findByTitle(
    title: string
  ): Promise<Course[]> {
    return await this.coursesRepository.find({
      where: [
        { title: Raw(alias => `LOWER(${alias}) ILIKE '%${title.toLowerCase()}%'`) }
      ]
    })
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`
  }

  remove(id: number) {
    return `This action removes a #${id} course`
  }
}
