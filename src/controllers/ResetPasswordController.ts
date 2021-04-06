import { User } from '@models/User'
import { Request, Response } from 'express'

class ResetPasswordController {
  async resetPassword (req: Request, res: Response) {
    const { email, token, password } = req.body

    try {
      const user = await User.findOne({
        email
      }).select('+passwordResetToken passwordResetExpires')

      if (!user) {
        return res.status(400).json({ error: 'User not found' })
      }

      if (token !== user.passwordResetToken) {
        return res.status(400).json({ error: 'Token Invalid' })
      }

      const now = new Date()

      if (now > user.passwordResetExpires) {
        return res.status(400).json({ error: 'Token expired, generate a new one' })
      }

      user.password = password

      await user.save()

      res.send()
    } catch (err) {
      res.status(400).json({ error: 'Cannot reset password, try again' })
    }
  }
}

export { ResetPasswordController }
