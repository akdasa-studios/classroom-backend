import { NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { RolesController } from '@classroom/backend/controllers/v1'
import { RolesService } from '@classroom/backend/services'
import { testingModule } from '@classroom/backend/utils'
import { CreateRoleRequest, UpdateRoleRequest } from '@classroom/backend/protocol'
import { Role } from '@classroom/backend/entities'


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


  // --- create() -------------------------------------------------------------

  describe('create()', () => {
    it.each([
      { name: 'New role', description: 'Description', permissions: [] },
    ])('should create role', async (request: CreateRoleRequest) => {
      const response = await rolesController.create(request)
      expect(response.id).toBeDefined()
    })

    it.each([
      ["name is missing",        { description: 'desc' }],
      ["name is empty",          { name: '', description: 'desc' }],
      ["description is missing", { name:        'role' }],
      ["description is empty",   { name: 'role', description: '' }],
    ])('should not create role if %s', async (_: string, role: CreateRoleRequest) => {
      const request = async () => await rolesController.create(role)
      expect(request).rejects.toThrow(UnprocessableEntityException)
    })
  })

  // --- findOne() ------------------------------------------------------------

  describe('findOne()', () => {
    let role: Role

    beforeEach(async () => {
      role = await rolesService.create({
        name: 'role',
        description: 'desc',
        permissions: []
      })
    })

    it('should return role if found', async () => {
      const response = await rolesController.findOne(role.id)
      expect(response.id).toEqual(role.id)
    })

    it('should throw exception if nothing found', async () => {
      const request = async () => await rolesController.findOne('1b5fb2a6-d113-47c6-b5c0-abd920eacf8c')
      expect(request).rejects.toThrow(NotFoundException)
    })
  })

  // --- findAll() ------------------------------------------------------------

  describe('findAll()', () => {
    it('should return an empty array if no roles found', async () => {
      const response = await rolesController.findAll()
      expect(response).toEqual({ items: [] })
    })
  })

  describe('findAll()', () => {
    beforeEach(async () => {
      await rolesService.create({ name: 'role 1', description: 'desc', permissions: [] })
      await rolesService.create({ name: 'role 2', description: 'desc', permissions: [] })
    })

    it('should return roles if found', async () => {
      const response = await rolesController.findAll()
      expect(response.items).not.toEqual([])
      expect(response.items).toHaveLength(2)
    })
  })

  // --- update() -------------------------------------------------------------

  describe('update()', () => {
    let role1: Role
    let role2: Role

    beforeEach(async () => {
      role1 = await rolesService.create({ name: 'role 1', description: 'desc', permissions: [] })
      role2 = await rolesService.create({ name: 'role 2', description: 'desc', permissions: [] })
    })

    it.each([
      ['name',                  { name: 'role 1 updated' }],
      ['description',           { description: 'description updated' }],
      ['name and description',  { name: 'role 1 updated', description: 'description updated' }],
      ['permissions',           { permissions: ['new'] }],
    ])('should update role with %s', async (field, request: UpdateRoleRequest) => {
      await rolesController.update(role1.id, request)
      const updatedEntity = await rolesService.findOne(role1.id)

      expect(updatedEntity.name).toEqual(request.name || role1.name)
      expect(updatedEntity.description).toEqual(request.description || role1.description)
      expect(updatedEntity.permissions).toEqual(request.permissions || role1.permissions)
    })
  })
})
