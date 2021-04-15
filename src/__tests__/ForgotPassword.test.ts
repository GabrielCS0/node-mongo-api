import MockMongo from './mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../app'
import { User } from '@models/User'

const forgotPassword = async (email: string) => {
  return await request(app).post('/forgot_password').send({
    email
  })
}

describe('Forgot Password', () => {
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

  it("Should be able to return the 'passwordResetToken' and 'passwordResetExpires' properties", async () => {
    await forgotPassword('useremail@gmail.com')

    const user = await User.findOne({ email: 'useremail@gmail.com' }).select('+passwordResetToken passwordResetExpires')

    expect(user).toHaveProperty('passwordResetToken')
    expect(user).toHaveProperty('passwordResetExpires')
  })

  it("Shouldn't be able for a non-existent user to change their password", async () => {
    const response = await forgotPassword('fakeuseremail@gmail.com')
    expect(response.status).toBe(400)
  })
})
