import MockMongo from './mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../app'
import bcrypt from 'bcryptjs'
import { User } from '@models/User'

const authenticate = async (email: string, password: string) => {
  return await request(app).post('/authentication').send({
    name: 'User Name',
    email,
    password
  })
}

describe('Authentication', () => {
  beforeAll(async () => {
    MockMongo.connect()

    await request(app).post('/register').send({
      name: 'User Name',
      email: 'useremail@gmail.com',
      password: 'userpassword'
    })
  })

  afterAll(async () => {
    MockMongo.disconnect()
  })

  it('Should be able to authenticate with valid credentials & return jwt token', async () => {
    const response = await authenticate('useremail@gmail.com', 'userpassword')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  it("Shouldn't be able to authenticate with invalid credentials", async () => {
    const response = await authenticate('useremail@gmail.com', 'wronguserpassword')

    const user = await User.findOne({ email: 'useremail@gmail.com' }).select('+password')
    const compareHash = await bcrypt.compare('wronguserpassword', user.password)

    expect(compareHash).toBe(false)
    expect(response.status).toBe(400)
  })

  it("Shouldn't be able to authenticate with a non-existent user", async () => {
    const response = await authenticate('wronguseremail@gmail.com', 'userpassword')

    expect(response.status).toBe(400)
  })
})
