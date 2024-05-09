import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@classroom/admin/services'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async requestCode(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if (!user) { throw new UnauthorizedException(); }
    return user
  }

  async validateCode(email: string, code: string): Promise<string> {
    const user = await this.usersService.findByEmail(email)
    if (!user) { throw new UnauthorizedException(); }
    if (!code) { throw new UnauthorizedException(); }
    
    const payload = { sub: user.id, name: user.name }
    return await this.jwtService.signAsync(payload)
  }
}
