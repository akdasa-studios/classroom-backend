import { RolesService } from './roles.service'
import { testingModule } from '@utils/testing-module'
import { ValidationError } from '@utils/entities.service'


describe('RolesService', () => {
  let rolesService: RolesService

  beforeEach(async () => {
    const app = await testingModule()
    rolesService = app.get<RolesService>(RolesService)
  })

  it('create role', async () => {
    const role = await rolesService.create({
      name: 'new role',
      description: 'description',
      permissions: [],
    })

    expect(role.id).toBeDefined()
    expect(role.name).toEqual('new role')
    expect(role.description).toEqual('description')
    expect(role.permissions).toEqual([])
  })

  it.each<string>([
    'name', 'description'
  ])('%s is required', async (field) => {
    const data = {
      name: 'name',
      description: 'description',
      permissions: [],
    }
    const dataWithExcludedKey = {
      ...data, 
      [field]: undefined
    }

    const create = async () => await rolesService.create(dataWithExcludedKey)
    expect(create).rejects.toThrow(ValidationError)
  })

  it('update role', async () => {
    const updateData = {
      name: 'updated',
      description: 'updated',
      permissions: ['updated']
    }

    // arrange
    const role = await rolesService.create({
      name: 'new',
      description: 'new',
      permissions: ['new'],
    })

    // act
    await rolesService.update(role.id, updateData)

    // assert
    const updated = await rolesService.findOne(role.id)
    expect(updated).toEqual({ id: role.id, ...updateData })
  })
})

