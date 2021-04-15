import { Request, Response } from 'express'
import { User } from '@models/User'
import jwt from 'jsonwebtoken'

class UserController {
  async create (req: Request, res: Response) {
    const { email } = req.body

    try {
      if (await User.findOne({ email })) { return res.status(400).json({ error: 'User already exists!' }) }
      const user = await User.create(req.body)
      const token = jwt.sign({ id: user.id }, `${process.env.SECRET}`, {
        expiresIn: 86400 // 1 Day
      })

      user.password = undefined
      return res.status(201).json({ user, token })
    } catch (err) {
      return res.status(400).json({ error: 'Registration Failed' })
    }
  }
}

export { UserController }
