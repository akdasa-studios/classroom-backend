import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator'
import { UsersService } from './users.service'

@Injectable()
@ValidatorConstraint({ async: true, name: "user-exists" })
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly users: UsersService) {}

  async validate(value: string): Promise<boolean> {
    const user = await this.users.findOne(value)
    return !!user
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    if (validationArguments.value?.id && validationArguments.property) {
      return `User '${validationArguments.value.id}' not found for '${validationArguments.property}'`
    } else {
      return 'User not found'
    }
  }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistConstraint,
    });
  };
}
