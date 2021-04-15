import { Request, Response } from 'express'
import { Project } from '@models/Project'
import { Task } from '@models/Task'

class ProjectController {
  async listAllProjects (req: Request, res: Response) {
    try {
      const projects = await Project.find().populate(['user', 'tasks'])
      return res.json({ projects })
    } catch (err) {
      return res.status(400).json({ error: 'Error loading projects' })
    }
  }

  async listOneProject (req: Request, res: Response) {
    try {
      const project = await Project.findById(req.params.projectId).populate(['user', 'tasks'])
      return res.json({ project })
    } catch (err) {
      return res.status(400).json({ error: 'Error loading project' })
    }
  }

  async createProject (req: Request, res: Response) {
    try {
      const { title, description, tasks } = req.body
      const project = await Project.create({ title, description, user: req.params.userId })

      await Promise.all(tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id })
        await projectTask.save()
        project.tasks.push(projectTask)
      }))

      await project.save()

      return res.status(201).json({ project })
    } catch (err) {
      return res.status(400).json({ error: 'Error creating new project' })
    }
  }

  async updateProject (req: Request, res: Response) {
    try {
      const { title, description, tasks } = req.body
      const project = await Project.findByIdAndUpdate(req.params.projectId, {
        title,
        description
      }, {
        new: true,
        useFindAndModify: false
      })

      project.tasks = []
      await Task.deleteOne({ project: project._id })

      await Promise.all(tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id })
        await projectTask.save()
        project.tasks.push(projectTask)
      }))

      await project.save()

      return res.json({ project })
    } catch (err) {
      return res.status(400).json({ error: 'Error updating project' })
    }
  }

  async deleteProject (req: Request, res: Response) {
    try {
      await Project.deleteOne({ _id: req.params.projectId })
      return res.send()
    } catch (err) {
      return res.status(400).json({ error: 'Error deleting project' })
    }
  }
}

export { ProjectController }
