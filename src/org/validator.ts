import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { RolesService } from './roles/roles.service'
import { validate } from 'uuid'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsRolesExist implements ValidatorConstraintInterface {
  constructor(private readonly roles: RolesService) {}

  async validate(value: string[]): Promise<boolean> {
    if (!value) { throw new UnprocessableEntityException(['roles should not be empty']) }
    if (!Array.isArray(value)) { throw new UnprocessableEntityException(['roles should be an array']) }
    if (value.length === 0) { throw new UnprocessableEntityException(['roles should not be empty']) }
    if (value.map(x => validate(x)).some(x => x === false)) { throw new UnprocessableEntityException(['invalid roles uuid']) }


    const roles = await this.roles.findMany(value)
    if (roles.length != value.length) {
      console.log(roles, value)
      const diff = value.filter(x => roles.find(y => y.id === x) === undefined)// roles.map(x => x.id).filter(x => !value.includes(x))
      throw new UnprocessableEntityException([`roles ${diff} doesn't exist`])
    } else {
      return true
    }
  }
}