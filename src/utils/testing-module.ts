import { Test, TestingModule } from '@nestjs/testing'
import { inMemoryDataSource } from './data-source'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '../org/roles/roles.entity'
import { User } from '../org/users/users.entity'
import { UsersController } from '../org/users/users.controller'
import { UsersService } from '../org/users/users.service'
import { RolesService } from '../org/roles/roles.service'
import { DataSource } from 'typeorm'

export const testingModule = async() => {
  const dataSource = await inMemoryDataSource()
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          name: 'default',
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Role, User])
      ],
      controllers: [UsersController],
      providers: [
        UsersService,
        RolesService
      ],
    })
      .overrideProvider(DataSource)
      .useValue(dataSource)
      .compile()
    return app
}