import { Request, Response } from 'express'
import { User } from '@models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthenticationController {
  async execute (req: Request, res: Response) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) { return res.status(400).send({ error: 'User not found' }) }

    if (!await bcrypt.compare(password, user.password)) { return res.status(400).send({ error: 'Invalid password' }) }

    user.password = undefined

    const token = jwt.sign({ id: user.id }, `${process.env.SECRET}`, {
      expiresIn: 86400 // 1 Day
    })

    res.send({ user, token })
  }
}

export { AuthenticationController }
