import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'
import * as protocol from '@classroom/protocol/AuthService'

export class AuthRequest implements protocol.AuthRequest {
  @ApiProperty({ example: 'example@example.com' })
  @IsEmail()
  email: string

  @ApiPropertyOptional({ example: '123123' })
  @IsOptional()
  @IsString()
  code?: string
}

export class AuthResponse implements protocol.AuthResponse {
  accessToken: string
  refreshToken: string
}

export class RefreshTokenRequest implements protocol.RefreshTokenRequest {
  refreshToken: string
}

export class RefreshTokenResponse implements protocol.RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}
