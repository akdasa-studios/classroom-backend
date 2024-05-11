import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '@classroom/admin/services'
import { AuthRequest, AuthResponse } from '@classroom/admin/protocol'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/email')
  async signIn(
    @Body() request: AuthRequest
  ): Promise<AuthResponse> {
    if (!request.code) {
      await this.authService.requestCode(request.email)
      return new AuthResponse()
    } else {
      if (!this.authService.validateCode(request.email, request.code)) {
        throw new UnauthorizedException()
      }

      const user = await this.authService.getOrCreateUser(request.email)
      const token = await this.authService.createToken(user)

      return { accessToken: token }
    }
  }
}
