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
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()
const projectController = new ProjectController()

router.post('/register', userController.create)
router.post('/authentication', authenticationController.execute)
router.post('/forgot_password', forgotPasswordController.execute)
router.post('/reset_password', resetPasswordController.resetPassword)

router.get('/projects', authMiddleware, projectController.listAllProjects)
router.get('/projects/:projectId', authMiddleware, projectController.listOneProject)
router.post('/projects', authMiddleware, projectController.createProject)
router.put('/projects/:projectId', authMiddleware, projectController.updateProject)
router.delete('/projects/:projectId', authMiddleware, projectController.deleteProject)

export { router }
