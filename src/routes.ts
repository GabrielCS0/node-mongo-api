import authMiddleware from './middlewares/auth'
import { Router } from 'express'
import { UserController } from '@controllers/UserController'
import { AuthenticationController } from '@controllers/AuthenticationController'
import { ProjectController } from '@controllers/ProjectController'
import { ForgotPasswordController } from '@controllers/ForgotPasswordController'
import { ResetPasswordController } from '@controllers/ResetPasswordController'

const router = Router()

const userController = new UserController()
const authenticationController = new AuthenticationController()
const projectController = new ProjectController()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

router.post('/register', userController.create)
router.post('/authentication', authenticationController.execute)
router.get('/projects', authMiddleware, projectController.execute)
router.post('/forgot_password', forgotPasswordController.execute)
router.post('/reset_password', resetPasswordController.resetPassword)

export { router }
