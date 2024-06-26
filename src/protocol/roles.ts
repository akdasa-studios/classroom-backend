import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import * as protocol from '@classroom/protocol/RolesService'

// -- Models ----------------------------------------------------------------

export class Role implements protocol.Role {
  @ApiProperty({ example: '4a46f92e-c296-4409-b65f-d7b5d25347f1' })
  @IsUUID(4)
  id: string

  @ApiProperty({ example: 'Teacher' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'Responsible for ...' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ example: '["org-roles"]', isArray: true })
  @IsString({ each: true })
  @IsNotEmpty()
  permissions: string[]
}


// -- Create ----------------------------------------------------------------

export class CreateRoleRequest implements protocol.CreateRoleRequest {
  @ApiProperty({ example: 'Teacher', required: true })
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'Responsible for ...', required: true })
  @IsNotEmpty()
  description: string

  @ApiProperty({ example: '["org-roles"]', required: true })
  permissions?: string[]
}

export class CreateRoleResponse implements protocol.CreateRoleResponse {
  id: string
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
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ example: 'Responsible for ...', required: false })
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty({ example: '["org-roles"]', isArray: true, required: false })
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[]
}

export class UpdateRoleResponse implements protocol.UpdateRoleResponse {
}


