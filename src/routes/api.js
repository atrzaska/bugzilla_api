const express = require('express')
const multer = require('multer')

const upload = multer({ dest: 'uploads/' })
const uploadAvatar = upload.single('avatar')

const { requiresAuth } = require('src/middleware/requiresAuth')
const authController = require('src/controllers/auth')
const commentsController = require('src/controllers/comments')
const invitesController = require('src/controllers/invites')
const membersController = require('src/controllers/members')
const tasksController = require('src/controllers/tasks')
const profilesController = require('src/controllers/profiles')
const projectsController = require('src/controllers/projects')
const storiesController = require('src/controllers/stories')

const router = express.Router()

router.post('/signin', authController.signin)
router.post('/signup', authController.signup)
router.post('/recover', authController.recover)
router.post('/confirm', authController.confirm)
router.get('/reset_password/:id', authController.showResetPassword)
router.put('/reset_password/:id', authController.updateResetPassword)

router.get('/refresh_token', requiresAuth, authController.refresh)
router.post('/logout', requiresAuth, authController.logout)

router.get('/me', requiresAuth, profilesController.show)
router.put('/me', requiresAuth, uploadAvatar, profilesController.update)
router.delete('/me', requiresAuth, profilesController.remove)
router.put('/me/email', requiresAuth, profilesController.updateEmail)
router.put('/me/password', requiresAuth, profilesController.updatePassword)

router.get('/projects', requiresAuth, projectsController.index)
router.post('/projects', requiresAuth, projectsController.create)
router.get('/projects/:id', requiresAuth, projectsController.show)
router.put('/projects/:id', requiresAuth, projectsController.update)
router.delete('/projects/:id', requiresAuth, projectsController.remove)

router.get('/stories', requiresAuth, storiesController.index)
router.post('/stories', requiresAuth, storiesController.create)
router.get('/stories/:id', requiresAuth, storiesController.show)
router.put('/stories/:id', requiresAuth, storiesController.update)
router.delete('/stories/:id', requiresAuth, storiesController.remove)

router.get('/tasks', requiresAuth, tasksController.index)
router.post('/tasks', requiresAuth, tasksController.create)
router.get('/tasks/:id', requiresAuth, tasksController.show)
router.put('/tasks/:id', requiresAuth, tasksController.update)
router.delete('/tasks/:id', requiresAuth, tasksController.remove)

router.get('/comments', requiresAuth, commentsController.index)
router.post('/comments', requiresAuth, commentsController.create)
router.get('/comments/:id', requiresAuth, commentsController.show)
router.put('/comments/:id', requiresAuth, commentsController.update)
router.delete('/comments/:id', requiresAuth, commentsController.remove)

router.get('/members', requiresAuth, membersController.index)
router.post('/members', requiresAuth, membersController.create)
router.get('/members/:id', requiresAuth, membersController.show)
router.put('/members/:id', requiresAuth, membersController.update)
router.delete('/members/:id', requiresAuth, membersController.remove)

router.post('/invites', requiresAuth, invitesController.create)

module.exports = router
