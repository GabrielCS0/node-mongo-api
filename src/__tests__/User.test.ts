import MockMongo from './mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../app'
import bcrypt from 'bcryptjs'
import { User } from '@models/User'

const createUser = async () => {
  return await request(app).post('/register').send({
    name: 'User Name',
    email: 'user@gmail.com',
    password: 'userpassword'
  })
}

describe('User', () => {
  beforeAll(async () => {
    MockMongo.connect()
  })

  afterAll(async () => {
    MockMongo.disconnect()
  })

  it('Should be able to create a new user & encrypt password & return jwt token', async () => {
    const response = await createUser()

    const user = await User.findOne({ email: response.body.user.email }).select('+password')
    const compareHash = await bcrypt.compare('userpassword', user.password)

    expect(response.status).toBe(201)
    expect(compareHash).toBe(true)
    expect(response.body).toHaveProperty('token')
  })

  it("Shouldn't be able to create a new user with an exists email", async () => {
    const response = await createUser()
    expect(response.status).toBe(400)
  })
})
