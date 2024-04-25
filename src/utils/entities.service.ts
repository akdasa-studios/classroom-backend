import { DeepPartial, Entity, In, ObjectLiteral, PrimaryGeneratedColumn, Repository } from 'typeorm'
import { validate } from 'class-validator'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export class ValidationError extends Error {
  public errors: any
  constructor(message: string, errors: any) {
    super(message)
    this.errors = errors
  }
}

@Entity()
export abstract class BaseModel {
  @PrimaryGeneratedColumn()
  public readonly id: string
}

export class EntitiesService<
  TEntity extends ObjectLiteral & BaseModel
> {
  constructor(
    private readonly repository: Repository<TEntity>
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
      return await this.repository.save(entity)
    } else {
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

  async update(id: string, request: QueryDeepPartialEntity<TEntity>) {
    return await this.repository.update(id, request)
  }

  async findMany(id: string[]) {
    return await this.repository.find({ 
      // @ts-ignore
      where: { id: In([...id || []]) } 
    })
  }
}
