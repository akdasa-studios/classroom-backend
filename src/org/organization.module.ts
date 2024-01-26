import { Module } from '@nestjs/common'
import { RolesController } from './roles/roles.controller'
import { RolesService } from './roles/roles.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './roles/roles.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class OrganizationModule {}
