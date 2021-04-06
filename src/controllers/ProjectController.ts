import { Request, Response } from 'express'

class ProjectController {
  async execute (req: Request, res: Response) {
    res.json({
      ok: 'True',
      user: req.params.userId
    })
  }
}

export { ProjectController }
