import { DeepPartial, In, ObjectLiteral, Repository, Raw } from 'typeorm'
import { validate } from 'class-validator'

export class ValidationError extends Error {
  public errors: any
  constructor(message: string, errors: any) {
    super(message)
    this.errors = errors
  }
}

export abstract class BaseModel {
  public readonly id: string
}

export class EntitiesService<
  TEntity extends ObjectLiteral & BaseModel
> {
  constructor(
    protected readonly repository: Repository<TEntity>
  ) { }

  /**
   * Creates new object
   */
  async create(
    request: DeepPartial<TEntity>
  ): Promise<TEntity> {
    const entity = this.repository.create(request)
    const errors = await validate(entity)
    if (errors.length == 0) {
      // console.log(">>>>", request)
      return await this.repository.save(request)
    } else {
      // TODO: Catch error correctrly. Endpoint returns 500
      throw new ValidationError("Error", errors)
    }
  }

  async findOne(id: string) {
    // @ts-ignore
    return await this.repository.findOneBy({ id })
  }

  async findAll() {
    return await this.repository.find()
  }

  async update(request: DeepPartial<TEntity>) {
    return await this.repository.save(request)
  }

  async findMany(id: string[]) {
    return await this.repository.find({ 
      // @ts-ignore
      where: { id: In([...id || []]) } 
    })
  }
}

