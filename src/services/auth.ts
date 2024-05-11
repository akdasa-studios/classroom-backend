import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@classroom/admin/services'
import { JwtService } from '@nestjs/jwt'
import { User } from '../entities';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async requestCode(
    email: string
  ): Promise<void> {
    // TODO: send email with code
    // TODO: save code in cache for future validation
  }

  async validateCode(
    email: string, code: string
  ): Promise<boolean> {
    // TODO: validate code from cache
    return true
  }

  async getOrCreateUser(
    email: string
  ) {
    const user = await this.usersService.findByEmail(email)
    if (user) { return user }

    return await this.usersService.create({
      email: email,
      status: 'invited',
      name: email,
      roles: []
    })
  }

  async createToken(
    user: User
  ) {
    return await this.jwtService.signAsync({ sub: user.id })
  }
}
