import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { testingModule } from '../../utils/testing-module'
import { Role } from './roles.entity'
import { UnprocessableEntityException } from '@nestjs/common'


describe('RolesController', () => {
  let rolesController: RolesController
  let rolesService: RolesService

  beforeEach(async () => {
    const app = await testingModule()
    rolesController = app.get<RolesController>(RolesController)
    rolesService = app.get<RolesService>(RolesService)
  })

  it('should be defined', () => {
    expect(rolesController).toBeDefined()
  })

  it('create role', async () => {
    const response = await rolesController.create({
      name: 'New role',
      description: 'Description',
      permissions: []
    })

    //@ts-ignore
    expect(response.id).toBeDefined()
  })

  it.each<string>([
    'name', 'description'
  ])('%s is required', async (field) => {
    const data = {
      name: 'name',
      description: 'description',
    }
    const dataWithExcludedKey = {
      ...data, 
      [field]: undefined
    }

    const request = async () => await rolesController.create(dataWithExcludedKey)
    expect(request).rejects.toThrow(UnprocessableEntityException)
  })

  // describe('findAll()', () => {
  //   it('should return an empty array if no roles found', async () => {
  //     const response = await rolesController.findAll()
  //     expect(response).toEqual({ data: [] })
  //   })
  //
  //   it('should return roles if found', async () => {
  //     const role = new Role()
  //     role.name = 'test'
  //     role.email = 'a@b.com'
  //     role.status = 'invited'
  //     role.roles = []
  //     await rolesService.save(role)
  //
  //     const response = await rolesController.findAll()
  //     expect(response.data).not.toEqual([])
  //     expect(response.data).toHaveLength(1)
  //   })
  // })

})
