import MockMongo from './mockDatabase/mockMongoDB'
import request from 'supertest'
import { app } from '../app'

const user = async () => {
  const email = 'user@gmail.com'
  const password = 'userpassword'

  await request(app).post('/register').send({
    name: 'User Name',
    email,
    password
  })

  return await request(app).post('/authentication').send({ email, password })
}

const project = async () => {
  const userResponse = await user()
  return await request(app).post('/projects').send({
    title: 'The Project',
    description: 'Project Description',
    tasks: [
      {
        title: 'New Task',
        assignedTo: userResponse.body.user._id
      }
    ]
  }).set('Authorization', `Bearer ${userResponse.body.token}`)
}

describe('Projects', () => {
  beforeAll(async () => {
    MockMongo.connect()
  })

  afterAll(async () => {
    MockMongo.disconnect()
  })

  it('Should be able to create a new project', async () => {
    const responseProject = await project()

    expect(responseProject.status).toBe(201)
    expect(responseProject.body).toHaveProperty('project')
  })

  it('Should be able to list all projects', async () => {
    const userResponse = await user()
    const response = await request(app).get('/projects')
      .set('Authorization', `Bearer ${userResponse.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('projects')
  })

  it('Should be able to list one project', async () => {
    const responseProject = await project()
    const userResponse = await user()
    const response = await request(app).get(`/projects/${responseProject.body.project._id}`)
      .set('Authorization', `Bearer ${userResponse.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('project')
  })

  it('Should be able to update a project', async () => {
    const responseProject = await project()
    const userResponse = await user()
    const response = await request(app).put(`/projects/${responseProject.body.project._id}`).send({
      title: 'The Project',
      description: 'New Project Description',
      tasks: [
        {
          title: 'New Task',
          assignedTo: '606c395b6ca42b4637fabcc5'
        }
      ]
    }).set('Authorization', `Bearer ${userResponse.body.token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('project')
  })

  it('Should be able to delete a project', async () => {
    const responseProject = await project()
    const userResponse = await user()
    const response = await request(app).delete(`/projects/${responseProject.body.project._id}`)
      .set('Authorization', `Bearer ${userResponse.body.token}`)

    expect(response.status).toBe(200)
  })
})
