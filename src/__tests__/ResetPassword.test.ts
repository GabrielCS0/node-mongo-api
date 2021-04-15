import MockMongo from './mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../app'
import { User } from '@models/User'

const resetPassword = async (email: string, token: string, newPassword: string) => {
  return await request(app).post('/reset_password').send({
    email,
    token,
    password: newPassword
  })
}

const updateUser = async (userId: string, token: string, date: Date): Promise<void> => {
  await User.findByIdAndUpdate(userId, {
    $set: {
      passwordResetToken: token,
      passwordResetExpires: date
    }
  }, {
    new: true,
    useFindAndModify: false
  })
}

describe('Reset Password', () => {
  beforeAll(async () => {
    MockMongo.connect()

    await request(app).post('/register').send({
      name: 'User Name',
      email: 'useremail@gmail.com',
      password: 'userpassword'
    })

    const user = await User.findOne({ email: 'useremail@gmail.com' })
    const now = new Date()
    now.setHours(now.getHours() + 1)

    updateUser(user.id, 'token', now)
  })

  afterAll(async () => {
    MockMongo.disconnect()
  })

  it('Should be able to change the password with valid credentials', async () => {
    const response = await resetPassword('useremail@gmail.com', 'token', 'newpassword')

    const authenticate = await request(app).post('/authentication').send({
      email: 'useremail@gmail.com',
      password: 'newpassword'
    })

    expect(response.status).toBe(200)
    expect(authenticate.status).toBe(200)
  })

  it("Shouldn't be able to change a non-existent user's password", async () => {
    const response = await resetPassword('fakeuseremail@gmail.com', 'token', 'newpassword')
    expect(response.status).toBe(400)
  })

  it("Shouldn't be able to change the password with an invalid token", async () => {
    const response = await resetPassword('useremail@gmail.com', 'falsetoken', 'newpassword')
    expect(response.status).toBe(400)
  })

  it("Shouldn't be able to change the password with an inspired token", async () => {
    const now = new Date()
    now.setHours(now.getHours() - 1)

    const user = await User.findOne({ email: 'useremail@gmail.com' })
    updateUser(user.id, 'token', now)

    const response = await resetPassword('useremail@gmail.com', 'token', 'newpassword')
    expect(response.status).toBe(400)
  })
})
