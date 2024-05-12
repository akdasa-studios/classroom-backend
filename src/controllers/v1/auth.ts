import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException, Headers } from '@nestjs/common'
import { AuthService, SessionsService, UsersService } from '@classroom/admin/services'
import { AuthRequest, AuthResponse, RefreshTokenResponse, RefreshTokenRequest } from '@classroom/admin/protocol'
import { AuthScope } from '@classroom/admin/decorators'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private sessionsService: SessionsService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/email')
  async signIn(
    @AuthScope() scope: string,
    @Body() request: AuthRequest,
  ): Promise<AuthResponse> {
    if (!request.code) {
      await this.authService.requestCode(request.email)
      return new AuthResponse()
    } else {
      // Check if the code is valid
      if (!this.authService.validateCode(request.email, request.code)) {
        throw new UnauthorizedException()
      }

      // If the request from the admin panel we should not create a new user
      // If the request from the mobile app we should create a new user
      const user = scope === "admin"
        ? await this.usersService.findByEmail(request.email)
        : await this.authService.getOrCreateUser(request.email)

      // Create a new session for the user
      const session = await this.sessionsService.create(user, scope)

      // Generate access token and refresh token
      const accessToken = await this.authService.createAccessToken(user)
      const refreshToken = session.refreshToken

      return { accessToken, refreshToken }
    }
  }

  @Post('/refresh')
  async refresh(
    @AuthScope() scope: string,
    @Body() request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    // Check if a session with the refresh token exists
    const session = await this.sessionsService.findByRefreshToken(request.refreshToken, scope)
    if (!session) { throw new UnauthorizedException() }

    // Generate access token and refresh token
    const accessToken = await this.authService.createAccessToken(session.user)
    const refreshToken = session.refreshToken // TODO: generate new refresh token

    return { accessToken, refreshToken }
  }
}
