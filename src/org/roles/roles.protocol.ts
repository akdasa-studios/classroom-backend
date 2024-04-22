import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import * as protocol from '@classroom/protocol/AccountsService'

// -- Models ----------------------------------------------------------------

export class Role implements protocol.Role {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  id: string

  @ApiProperty({ example: 'Teacher' })
  name: string

  @ApiProperty({ example: 'Responsible for ...' })
  description: string

  @ApiProperty({ example: '["org-roles"]', isArray: true })
  @IsString({ each: true })
  permissions: string[]
}


// -- Create ----------------------------------------------------------------

export class CreateRoleRequest implements protocol.CreateRoleRequest {
  @ApiProperty({ example: 'Teacher', required: true })
  @IsNotEmpty()
  public name: string

  @ApiProperty({ example: 'Responsible for ...', required: true })
  @IsNotEmpty()
  description: string

  @ApiProperty({ example: '["org-roles"]', required: true })
  @IsNotEmpty()
  @IsString({ each: true })
  permissions: string[]
}

export class CreateRoleResponse implements protocol.CreateRoleResponse {
}


// -- Get -------------------------------------------------------------------

export class GetRoleResponse implements protocol.GetRoleResponse {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  id: string

  @ApiProperty({ example: 'Teacher' })
  name: string

  @ApiProperty({ example: 'Responsible for ...' })
  description: string

  @ApiProperty({ example: '["org-roles"]' })
  @IsString({ each: true })
  permissions: string[]
}


export class GetRolesResponse implements protocol.GetRolesResponse {
  @ApiProperty({ type: Role, isArray: true })
  items: Role[]
}


// -- Update ----------------------------------------------------------------

export class UpdateRoleRequest implements protocol.UpdateRoleRequest {
  @ApiProperty({ example: 'Teacher', required: false })
  name?: string

  @ApiProperty({ example: 'Responsible for ...', required: false })
  description?: string

  @ApiProperty({ example: '["org-roles"]', isArray: true, required: false })
  permissions?: string[]
}

export class UpdateRoleResponse implements protocol.UpdateRoleResponse {
}


