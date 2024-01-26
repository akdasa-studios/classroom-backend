import { PartialType } from '@nestjs/mapped-types'
import { CreateRoleDto } from './roles.dto.create'

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
