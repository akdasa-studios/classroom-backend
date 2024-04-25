import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesController } from './roles/roles.controller'
import { Role } from './roles/roles.entity'
import { RolesService } from './roles/roles.service'
import { UsersController } from './users/users.controller'
import { User } from './users/users.entity'
import { UsersService } from './users/users.service'
import { IsRolesExist } from './validator'
import { IsUserExist, IsUserExistConstraint } from './users/users.entity.validators'

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [RolesController, UsersController],
  providers: [IsRolesExist, IsUserExistConstraint, RolesService, UsersService],
})
export class OrganizationModule {}
