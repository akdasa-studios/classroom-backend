import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator'
import * as protocol from 'submodules/protocol/lib/user'
import { IsRolesExist } from '../validator'
import { Validate } from 'class-validator'

export class InvalidResponse {
  @ApiPropertyOptional({
    example: 'Error description',
  })
  message?: string
}

export class CreateUserRequest implements protocol.CreateUserRequest {
  @ApiProperty({
    example: 'Advaita Krishna das',
    required: true
  })
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: 'test@example.com',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: '["752804b0-b6d8-478c-9d16-f59f1ea14dde"]',
    required: true
  })
  @Validate(IsRolesExist)
  @IsNotEmpty()
  @IsUUID(4, { each:true })
  roles: string[]

  @ApiPropertyOptional({
    example: 'Teacher'
  })
  title?: string

  @ApiPropertyOptional({
    example: 'Main department'
  })
  department?: string
}
