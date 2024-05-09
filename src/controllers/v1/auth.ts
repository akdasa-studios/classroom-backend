import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from '@classroom/admin/services'
import { AuthRequest, AuthResponse } from '@classroom/admin/protocol'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(
    @Body() request: AuthRequest
  ): Promise<AuthResponse> {
    if (!request.code) {
      this.authService.requestCode(request.email)
      return new AuthResponse()
    } else {
      const token = await this.authService.validateCode(request.email, request.code)
      return { access_token: token }
    }
  }
}
