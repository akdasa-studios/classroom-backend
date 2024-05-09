import { NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { UsersController } from '@classroom/admin/controllers/v1'
import { RolesService, UsersService } from '@classroom/admin/services'
import { testingModule } from '@classroom/admin/utils'
import { CreateUserRequest, UpdateUserRequest } from '@classroom/admin/protocol'
import { Role, User } from '@classroom/admin/entities'
import { UserStatus } from '@classroom/protocol/UsersService'

const DefaultUser = { name: 'new user', email: 'test@test.com', roleIds: [] }

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService
  let rolesService: RolesService

  beforeEach(async () => {
    const app = await testingModule()
    usersController = app.get<UsersController>(UsersController)
    usersService = app.get<UsersService>(UsersService)
    rolesService = app.get<RolesService>(RolesService)
  })

  it('should be defined', () => {
    expect(UsersController).toBeDefined()
  })


  // --- create() -------------------------------------------------------------

  describe('create()', () => {
    it.each([
      { name: 'new user', email: 'test@test.com', roleIds: [] },
      { name: 'new user', email: 'test@test.com', roleIds: [], avatarUrl: 'image.png' },
      { name: 'new user', email: 'test@test.com', roleIds: [], avatarUrl: 'image.png', department: 'dep' },
      { name: 'new user', email: 'test@test.com', roleIds: [], avatarUrl: 'image.png', department: 'dep', title: 'title' },
    ])('should create User', async (request: CreateUserRequest) => {
      const response = await usersController.create(request)
      const user = await usersService.findOne(response.id)

      expect(user.id).toBeDefined()
      expect(user.status).toEqual('invited')
      expect(user.email).toEqual(request.email)
      expect(user.roleIds).toEqual(request.roleIds)
      expect(user.avatarUrl).toEqual(request.avatarUrl || null)
      expect(user.department).toEqual(request.department || null)
      expect(user.title).toEqual(request.title || null)
    })

    it.each([
      { name: 'name', email: 'INCORRECT', roleIds: [] },
      { name: '', email: 'test@test.com', roleIds: [] },
      { email: 'test@test.com', roleIds: [] },
      { name: 'new user', roleIds: [] },
    ])('should not create user', async (user: CreateUserRequest) => {
      const request = async () => await usersController.create(user)
      expect(request).rejects.toThrow(UnprocessableEntityException)
    })
  })

  // --- findOne() ------------------------------------------------------------

  describe('findOne()', () => {
    let user: User

    beforeEach(async () => {
      user = await usersService.create({
        name: 'new user', email: 'test@test.com', roleIds: []
      })
    })

    it('should return User if found', async () => {
      const response = await usersController.findOne(user.id)
      expect(response.id).toEqual(user.id)
    })

    it('should throw exception if nothing found', async () => {
      const request = async () => await usersController.findOne('1b5fb2a6-d113-47c6-b5c0-abd920eacf8c')
      expect(request).rejects.toThrow(NotFoundException)
    })
  })

  // --- findAll() ------------------------------------------------------------

  // describe('findAll()', () => {
  //   it('should return an empty array if no Users found', async () => {
  //     const response = await usersController.findAll()
  //     expect(response).toEqual({ items: [] })
  //   })
  // })

  // describe('findAll()', () => {
  //   beforeEach(async () => {
  //     await usersService.create({ name: 'new user', email: 'test1@test.com', roleIds: [] })
  //     await usersService.create({ name: 'new user', email: 'test2@test.com', roleIds: [] })
  //   })

  //   it('should return users if found', async () => {
  //     const response = await usersController.findAll('new user')
  //     expect(response.items).not.toEqual([])
  //     expect(response.items).toHaveLength(2)
  //   })
  // })

  // --- update() -------------------------------------------------------------

  describe('update()', () => {
    let user1: User
    let role1: Role

    beforeEach(async () => {
      user1 = await usersService.create({ ...DefaultUser, email: "t1@t.com" })
      role1 = await rolesService.create({
        id: "38f47fc9-0d82-4915-be95-657beec29f92",
        name: 'admin', description: 'desc', permissions: []
      })
    })

    it.each([
      { name: 'new name' },
      { email: 'new@email.com' },
      { roleIds: ["38f47fc9-0d82-4915-be95-657beec29f92"] },
      { status: 'inactive' as UserStatus },
      { title: 'new title' },
      { department: 'new department' },
      { avatarUrl: 'new image.png' },
    ])('should update user', async (request: UpdateUserRequest) => {
      await usersController.update(user1.id, request)
      const updatedEntity = await usersService.findOne(user1.id)

      expect(updatedEntity.name).toEqual(request.name || user1.name)
      expect(updatedEntity.email).toEqual(request.email || user1.email)
      expect(updatedEntity.roleIds).toEqual(request.roleIds || user1.roleIds)
      expect(updatedEntity.status).toEqual(request.status || user1.status)
      expect(updatedEntity.title).toEqual(request.title || user1.title)
      expect(updatedEntity.department).toEqual(request.department || user1.department)
      expect(updatedEntity.avatarUrl).toEqual(request.avatarUrl || user1.avatarUrl)
    })
  })
})
