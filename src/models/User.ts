import { mongoose } from '../database'
import { IUsersRepository } from '../repositories/IUsersRepository'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    require: true
  },

  password: {
    type: String,
    select: false,
    required: true
  },

  passwordResetToken: {
    type: String,
    select: false
  },

  passwordResetExpires: {
    type: Date,
    select: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre<IUsersRepository>('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

const User = mongoose.model<IUsersRepository>('User', UserSchema)

export { User }
