import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from './courses.entity'
import { DeepPartial, In, Repository } from 'typeorm'

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private coursesRepository: Repository<Course>,
  ) { }

  async create(request: DeepPartial<Course>): Promise<Course> {
    return await this.coursesRepository.save([request])[0]
  }

  async findOne(id: string) {
    return await this.coursesRepository.findOneBy({id})
  }

  async findAll() {
    return await this.coursesRepository.find()
  }

  async update(id: string, request: DeepPartial<Course>) {
    return await this.coursesRepository.update(id, request)
  }

  async findMany(id: string[]) {
    return await this.coursesRepository.find({ where: { id: In([...id || []]) } })
  }
}
