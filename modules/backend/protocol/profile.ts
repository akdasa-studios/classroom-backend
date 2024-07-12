import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'
import * as protocol from '@classroom/protocol/ProfileService'

export class GetProfileResponse implements protocol.GetProfileResponse {
  @ApiProperty({ example: '59633e95-0362-409c-b709-4aa23e00b32c' })
  @IsUUID(4)
  id: string

  @ApiProperty({ example: 'Krishna das' })
  @IsString()
  name: string

  @ApiProperty({ example: '123123' })
  @IsString({ each: true })
  permissions: string[]
}

export class UpdateProfileRequest implements protocol.UpdateProfileRequest {
  @ApiProperty({ example: 'Krishna das' })
  @IsString()
  name: string

  @ApiProperty({ example: 'Krishna das' })
  @IsString()
  location: string

  @ApiProperty({ example: 'Krishna das' })
  @IsString()
  phone: string
}

export class UpdateProfileResponse implements protocol.UpdateProfileResponse {
}
