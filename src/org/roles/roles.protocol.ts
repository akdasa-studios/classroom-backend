import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import * as protocol from '@classroom/protocol/AccountsService'

export class CreateRoleRequest implements protocol.CreateRoleRequest {
  @ApiProperty({
    example: 'Teacher',
    required: true
  })
  @IsNotEmpty()
  public name: string

  @ApiProperty({
    example: 'Responsible for...',
    required: true
  })
  @IsNotEmpty()
  description: string

  @ApiProperty({
    example: '["org-roles"]',
    required: true
  })
  @IsNotEmpty()
  @IsString({ each: true })
  permissions: string[]
}

export class CreateRoleResponse implements protocol.CreateRoleResponse {
}


export class GetRoleResponse implements protocol.GetRoleResponse {
}

