import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsUUID, IsOptional, IsString, IsNotEmpty } from 'class-validator'
import * as protocol from '@classroom/protocol/UsersService'

// -- Models ----------------------------------------------------------------

export class User implements protocol.User {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID()
  id: string

  @ApiProperty({ example: 'Krishna das' })
  name: string

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'active' })
  status: protocol.UserStatus

  @ApiProperty({
    type: String,
    isArray: true,
    example: [
      '9322c384-fd8e-4a13-80cd-1cbd1ef95ba8',
      '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
    ],
  })
  @IsUUID('4', { each: true })
  roleIds: string[]
  
  @ApiProperty({ example: 'Head of department', required: false })
  @IsOptional()
  title?: string
  
  @ApiProperty({ example: 'Financial', required: false })
  @IsOptional()
  department?: string
  
  @ApiProperty({ example: 'https://pics.com/img.jpg', required: false })
  @IsOptional()
  avatarUrl?: string
}


// -- Create ----------------------------------------------------------------

export class CreateUserRequest implements protocol.CreateUserRequest {
  @ApiProperty({ example: 'Krishna das' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'active' })
  status: protocol.UserStatus

  @ApiProperty({
    type: String,
    isArray: true,
    example: [
      '9322c384-fd8e-4a13-80cd-1cbd1ef95ba8',
      '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
    ],
  })
  @IsUUID('4', { each: true })
  roleIds: string[]
  
  @ApiProperty({ example: 'Head of department', required: false })
  @IsOptional()
  title?: string
  
  @ApiProperty({ example: 'Financial', required: false })
  @IsOptional()
  department?: string
  
  @ApiProperty({ example: 'https://pics.com/img.jpg', required: false })
  @IsOptional()
  avatarUrl?: string
}

export class CreateUserResponse implements protocol.CreateUserResponse {
}


// -- Get -------------------------------------------------------------------

export class GetUserResponse implements protocol.GetUserResponse {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID()
  id: string

  @ApiProperty({ example: 'Krishna das' })
  name: string

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'active' })
  status: protocol.UserStatus

  @ApiProperty({
    type: String,
    isArray: true,
    example: [
      '9322c384-fd8e-4a13-80cd-1cbd1ef95ba8',
      '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
    ],
  })
  @IsUUID('4', { each: true })
  roleIds: string[]
  
  @ApiProperty({ example: 'Head of department', required: false })
  @IsOptional()
  title?: string
  
  @ApiProperty({ example: 'Financial', required: false })
  @IsOptional()
  department?: string
  
  @ApiProperty({ example: 'https://pics.com/img.jpg', required: false })
  @IsOptional()
  avatarUrl?: string
}


export class GetUsersResponse implements protocol.GetUsersResponse {
  @ApiProperty({ type: User, isArray: true })
  items: User[]
}


// -- Update ----------------------------------------------------------------

export class UpdateUserRequest implements protocol.UpdateUserRequest {
  @ApiProperty({ example: 'Krishna das', required: false })
  @IsOptional()
  name?: string

  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string

  @ApiProperty({ example: 'active' })
  @IsOptional()
  status?: protocol.UserStatus

  @ApiProperty({
    type: String,
    isArray: true,
    example: [
      '9322c384-fd8e-4a13-80cd-1cbd1ef95ba8',
      '986dcaf4-c1ea-4218-b6b4-e4fd95a3c28e',
    ],
  })
  @IsUUID('4', { each: true })
  @IsOptional()
  roleIds?: string[]
  
  @ApiProperty({ example: 'Head of department', required: false })
  @IsOptional()
  title?: string
  
  @ApiProperty({ example: 'Financial', required: false })
  @IsOptional()
  department?: string
  
  @ApiProperty({ example: 'https://pics.com/img.jpg', required: false })
  @IsOptional()
  avatarUrl?: string
}

export class UpdateUserResponse implements protocol.UpdateUserResponse {
}


