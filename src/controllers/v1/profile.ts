import { Controller, HttpCode, HttpStatus, Get, NotFoundException, Patch, Body, UseGuards } from '@nestjs/common'
import { UsersService } from '@classroom/admin/services'
import { GetProfileResponse, UpdateProfileRequest, UpdateProfileResponse } from '@classroom/admin/protocol'
import { AuthGuard } from '@classroom/admin/guards'
import { AuthenticatedUserId } from '@classroom/admin/decorators'

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(
    @AuthenticatedUserId() userId: string
  ): Promise<GetProfileResponse> {
    const user = await this.usersService.findOne(userId)
    if (user && user.status === 'active') {
      return { id: user.id, name: user.name, permissions: user.permissions }
    } else {
      throw new NotFoundException()
    }
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() request: UpdateProfileRequest,
    @AuthenticatedUserId() userId: string,
  ): Promise<UpdateProfileResponse> {
    const user = await this.usersService.findOne(userId)
    if (!user) throw new NotFoundException()

    await this.usersService.update({
      id: userId,
      name: request.name,
      status: user.status === 'invited' ? 'active' : user.status,
    })
    return {}
  }
}
