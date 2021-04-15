import { User } from '@models/User'
import { Request, Response } from 'express'
import crypto from 'crypto'
import SendMailService from '../services/SendMailService'
import { resolve } from 'path'

class ForgotPasswordController {
  async execute (req: Request, res: Response) {
    const { email } = req.body

    try {
      const user = await User.findOne({
        email
      })

      if (!user) { return res.status(400).json({ error: 'User not found' }) }

      const token = crypto.randomBytes(20).toString('hex')
      const now = new Date()
      now.setHours(now.getHours() + 1)

      await User.findByIdAndUpdate(user.id, {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      }, {
        new: true,
        useFindAndModify: false
      })

      const mailPath = resolve(__dirname, '..', 'views', 'emails', 'forgotPassword.hbs')
      await SendMailService.execute(email, 'Did you forget your password?', { token }, mailPath)
      console.log('Email message sent!')
      return res.send()
    } catch (err) {
      res.status(400).json({ error: 'Error on forgot password, try again' })
    }
  }
}

export { ForgotPasswordController }
