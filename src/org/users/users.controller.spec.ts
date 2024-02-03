import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { testingModule } from '../../utils/testing-module'
import { User } from './users.entity'


describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService

  beforeEach(async () => {
    const app = await testingModule()
    usersController = app.get<UsersController>(UsersController)
    usersService = app.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(usersController).toBeDefined()
  })

  // describe('create()', () => {
  //   it('email is required', async () => {
  //     const user = new User()
  //     user.name = 'test'
  //     user.status = 'invited'
  //     user.roles = []
  //     await usersService.save(user)
  //   })
  // })

  describe('findAll()', () => {
    it('should return an empty array if no users found', async () => {
      const response = await usersController.findAll()
      expect(response).toEqual({ data: [] })
    })

    it('should return users if found', async () => {
      const user = new User()
      user.name = 'test'
      user.email = 'a@b.com'
      user.status = 'invited'
      user.roles = []
      await usersService.save(user)

      const response = await usersController.findAll()
      expect(response.data).not.toEqual([])
      expect(response.data).toHaveLength(1)
    })
  })

})