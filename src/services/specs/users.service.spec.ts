import { RolesService, UsersService } from '@classroom/admin/services'
import { Role } from '@classroom/admin/entities'
import { ValidationError, testingModule } from '@classroom/admin/utils'

describe('UsersService', () => {
  let usersService: UsersService
  let rolesService: RolesService
  let roleAdmin: Role = undefined
  let roleStudent: Role = undefined

  beforeEach(async () => {
    const app = await testingModule()
    usersService = app.get<UsersService>(UsersService)
    rolesService = app.get<RolesService>(RolesService)

    roleAdmin = await rolesService.create({
      name: "role",
      description: "descr",
      permissions: ["admin"]
    })

    roleStudent = await rolesService.create({
      name: "student",
      description: "descr",
      permissions: ["homework:view", "homework:create"]
    })
  })

  it('create user', async () => {
    const user = await usersService.create({
      name: 'new user',
      email: 'test@example.com',
      status: 'active',
      roles: [roleAdmin, roleStudent]
    })

    expect(user.id).toBeDefined()
    expect(user.email).toEqual("test@example.com")
    expect(user.status).toEqual('active')
    expect(user.roles).toEqual([roleAdmin, roleStudent])
    expect(user.permissions).toEqual(["admin", "homework:view", "homework:create"])
  })

  // it.each<string>([
  //   'name', 'description'
  // ])('%s is required', async (field) => {
  //   const data = {
  //     name: 'name',
  //     description: 'description',
  //     permissions: [],
  //   }
  //   const dataWithExcludedKey = {
  //     ...data, 
  //     [field]: undefined
  //   }
  //
  //   const create = async () => await usersService.create(dataWithExcludedKey)
  //   expect(create).rejects.toThrow(ValidationError)
  // })
  //
  // it('update user', async () => {
  //   const updateData = {
  //     name: 'updated',
  //     description: 'updated',
  //     permissions: ['updated']
  //   }
  //
  //   // arrange
  //   const user = await usersService.create({
  //     name: 'new',
  //     description: 'new',
  //     permissions: ['new'],
  //   })
  //
  //   // act
  //   await usersService.update(user.id, updateData)
  //
  //   // assert
  //   const updated = await usersService.findOne(user.id)
  //   expect(updated).toEqual({ id: user.id, ...updateData })
  // })
})

