import request from 'supertest'
import { app } from '../app'

describe('authentication middleware', () => {
  it("Shouldn't be able to access private routes without token", async () => {
    const response = await request(app).get('/projects')
    expect(response.status).toBe(401)
  })

  it("shouldn't be able to access private routes with a invalid token", async () => {
    const response = await request(app).get('/projects')
      .set('Authorization', '264281864163')

    const responseB = await request(app).get('/projects')
      .set('Authorization', 'Bearer 264281864163')

    expect(response.status).toBe(401)
    expect(responseB.status).toBe(401)
  })

  it("Shouldn't be able to access private routes with a malformatted token", async () => {
    const response = await request(app).get('/projects')
      .set('Authorization', 'Berer 6217634516246')
    expect(response.status).toBe(401)
  })
})
