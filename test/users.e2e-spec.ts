import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { useContainer } from 'class-validator'
import * as request from 'supertest'
import { RolesService } from '../src/org/roles/roles.service'
import { AppModule } from '../src/app.module'

function validationError(
  ...messages: string[]
) {
  return {
    message: messages,
    error: 'Unprocessable Entity',
    statusCode: 422
  }
}

describe('E2E UsersController', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      errorHttpStatusCode: 422,
    }))
    const a = app.get<RolesService>(RolesService)
    await a.create({ id: '14ddacd8-fdc8-4f1c-b8c7-c31839f92f87', name: 'test role', description: 'descr', permissions: [] })
    useContainer(app.select(AppModule), { fallbackOnErrors: true })
    await app.init()
  })

  /* -------------------------------------------------------------------------- */
  /*                                 Happy Path                                 */
  /* -------------------------------------------------------------------------- */

  it('POST /users # 201 create new one', () => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        'name': 'Advaita Krishna das',
        'email': 'a@b.com',
        'roles': ['14ddacd8-fdc8-4f1c-b8c7-c31839f92f87']
      })
      .expect(201)
      .expect({'success': true})
  })


  /* -------------------------------------------------------------------------- */
  /*                                Invalid Email                               */
  /* -------------------------------------------------------------------------- */

  it.each([
    // TODO: too long name
    [undefined,      ['email should not be empty', 'email must be an email']],
    ['',             ['email should not be empty', 'email must be an email']],
    ['ooooo',        ['email must be an email']],
    ['o@@a.com',     ['email must be an email']],
    [[],             ['email must be an email']],
    [['a@b.com'],    ['email must be an email']],
  ])('POST /users # 422 invalid email (%p)', (email: string, errors: string[]) => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        'name': 'Advaita Krishna das',
        'email': email,
        'roles': ['14ddacd8-fdc8-4f1c-b8c7-c31839f92f87']
      })
      .expect(422)
      .expect(
        validationError(...errors)
      )
  })


  /* -------------------------------------------------------------------------- */
  /*                                Invalid Name                                */
  /* -------------------------------------------------------------------------- */

  it.each([
    // TODO: too long name
    [undefined],
    ['']
  ])('POST /users # 422 invalid name (%p)', (name: string | undefined) => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        'name': name,
        'email': 'a@b.com',
        'roles': ['14ddacd8-fdc8-4f1c-b8c7-c31839f92f87']
      })
      .expect(422)
      .expect(
        validationError('name should not be empty')
      )
  })


  /* -------------------------------------------------------------------------- */
  /*                                Invalid Roles                               */
  /* -------------------------------------------------------------------------- */

  it.each([
    [undefined,                                'roles should not be empty'],
    [[],                                       'roles should not be empty'],
    [['12345'],                                'invalid roles uuid'],
    ['12345',                                  'roles should be an array'],
    [['4f27fbdf-5e71-4aa3-8959-800e5e0376ab'], 'roles 4f27fbdf-5e71-4aa3-8959-800e5e0376ab doesn\'t exist']
  ])('POST /users # 422 invalid roles (%p)', (roles, error) => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Accept', 'application/json')
      .send({
        'name': 'Advaita Krishna das',
        'roles': roles,
        'email': 'a@b.com',
      })
      .expect(422)
      .expect(
        validationError(error)
      )
  })
})
