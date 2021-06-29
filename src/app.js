const express = require('express')
const morgan = require('morgan')
const { generateToken, refreshToken } = require('./helpers/jwt')
const { requiresAuth } = require('./middleware/requiresAuth')
const Project = require('./models/project')
const Story = require('./models/Story')
const Comment = require('./models/Comment')
const Task = require('./models/Task')
const User = require('./models/User')
const UserProject = require('./models/userProject')
const collection = require('./helpers/collection')
const { validatePassword } = require('./helpers/auth')
const createUser = require('./services/user/create')
const {
  mapErrors,
  validate,
  signUpSchema,
  signInSchema,
} = require('./helpers/yup')
const { NotFoundError } = require('./helpers/errors')
const fields = require('./helpers/fields')

const app = express()
const port = 4000

app.use(morgan('dev'))
app.use(express.json())

app.get('/api/refresh_token', requiresAuth, (req, res) =>
  res.json({ token: refreshToken(req.token) })
)
app.post('/api/signin', (req, res) => {
  const errors = validate(req.body, signInSchema)

  if (errors.length) {
    res.status(422).json(mapErrors(errors))
    return
  }

  const { email, password } = req.body
  const user = User.findBy({ email })

  if (!user) {
    res.status(422).json({})
    return
  }

  if (!user.confirmed) {
    res.status(422).json({})
  }

  if (validatePassword(user, password)) {
    res.json({ token: generateToken({ id: user.id }) })
  } else {
    res.status(422).json({})
  }
})
app.post('/api/signup', (req, res) => {
  const errors = validate(req.body, signUpSchema)

  if (errors.length) {
    res.status(422).json(mapErrors(errors))
    return
  }

  const { email } = req.body
  let user = User.findBy({ email })

  if (user) {
    res.status(422).json({ errors: { email: 'This email is already taken' } })
    return
  }

  user = createUser(req.body)

  res.json(user)
})
app.post('/api/logout', requiresAuth, (req, res) => res.json({}))
app.get('/api/me', requiresAuth, (req, res) => res.json(fields(req.user, req)))
app.post('/api/recover', (req, res) => res.json(req.body))
app.post('/api/confirm', (req, res) => res.json(req.body))
app.get('/api/reset_password/:id', (req, res) =>
  res.json({ id: req.params.id })
)
app.put('/api/reset_password/:id', (req, res) => res.json(req.body))
app.put('/api/me', (req, res) => res.json(req.body))
app.put('/api/me/email', (req, res) => res.json(req.body))
app.put('/api/me/password', (req, res) => res.json(req.body))

app.get('/api/projects', requiresAuth, (req, res) => {
  const userProjects = UserProject.where({ userId: req.user.id })
  const projectIds = userProjects.map((x) => x.projectId)
  const projects = Project.where({ id: projectIds })
  res.json(collection(projects, req))
})
app.post('/api/projects', requiresAuth, (req, res) => {
  const project = Project.create(req.body)
  UserProject.create({
    userId: req.user.id,
    projectId: project.id,
    role: 'owner',
  })
  res.json(project)
})
app.get('/api/projects/:id', requiresAuth, (req, res) => {
  const userId = req.user.id
  const projectId = parseInt(req.params.id)
  const userProject = UserProject.all().find(
    (up) => up.userId === userId && up.projectId === projectId
  )
  let isOwner = false

  if (userProject) {
    isOwner = userProject.role === 'owner'
  }

  res.json({ ...Project.find(projectId), isOwner })
})
app.put('/api/projects/:id', requiresAuth, (req, res) =>
  res.json(Project.update(req.params.id, req.body))
)
app.delete('/api/projects/:id', requiresAuth, (req, res) =>
  res.json(Project.remove(req.params.id))
)

app.get('/api/stories', requiresAuth, (req, res) =>
  res.json(collection(Story.all(), req))
)
app.post('/api/stories', requiresAuth, (req, res) => {
  res.json(
    Story.create({
      ...req.body,
      state: 'unstarted',
      tasksCount: 0,
      commentsCount: 0,
    })
  )
})
app.get('/api/stories/:id', requiresAuth, (req, res) =>
  res.json(Story.find(req.params.id))
)
app.put('/api/stories/:id', requiresAuth, (req, res) =>
  res.json(Story.update(req.params.id, req.body))
)
app.delete('/api/stories/:id', requiresAuth, (req, res) =>
  res.json(Story.remove(req.params.id))
)

app.get('/api/tasks', requiresAuth, (req, res) =>
  res.json(collection(Task.all(), req))
)
app.post('/api/tasks', requiresAuth, (req, res) =>
  res.json(Task.create(req.body))
)
app.get('/api/tasks/:id', requiresAuth, (req, res) =>
  res.json(Task.find(req.params.id))
)
app.put('/api/tasks/:id', requiresAuth, (req, res) =>
  res.json(Task.update(req.params.id, req.body))
)
app.delete('/api/tasks/:id', requiresAuth, (req, res) =>
  res.json(Task.remove(req.params.id))
)

app.get('/api/comments', requiresAuth, (req, res) =>
  res.json(collection(Comment.all(), req))
)
app.post('/api/comments', requiresAuth, (req, res) =>
  res.json(Comment.create(req.body))
)
app.get('/api/comments/:id', requiresAuth, (req, res) =>
  res.json(Comment.find(req.params.id))
)
app.put('/api/comments/:id', requiresAuth, (req, res) =>
  res.json(Comment.update(req.params.id, req.body))
)
app.delete('/api/comments/:id', requiresAuth, (req, res) =>
  res.json(Comment.remove(req.params.id))
)

app.get('/api/members', requiresAuth, (req, res) => {
  const filterProjectId = parseInt(req.query['filter.projectId'])
  const members = UserProject.where({ projectId: filterProjectId })
  const userIds = members.map((x) => x.userId)
  const isCurrentUserMember = userIds.includes(req.user.id)

  if (!isCurrentUserMember) {
    res.status(403).json({})
    return
  }

  const results = UserProject.all()

  results.forEach((r) => {
    const user = User.find(r.userId)
    r.name = user.name
    r.email = user.email
    r.photoUrl = user.photoUrl
  })

  res.json(collection(results, req))
})
app.post('/api/members', requiresAuth, (req, res) =>
  res.json(UserProject.create(req.body))
)
app.get('/api/members/:id', requiresAuth, (req, res) =>
  res.json(UserProject.find(req.params.id))
)
app.put('/api/members/:id', requiresAuth, (req, res) =>
  res.json(UserProject.update(req.params.id, req.body))
)
app.delete('/api/members/:id', requiresAuth, (req, res) =>
  res.json(UserProject.remove(req.params.id))
)
app.post('/api/invites', requiresAuth, (req, res) => {
  const senderId = req.user.id
  const recipientId = null
  const invite = { ...req.body, senderId, recipientId }
  res.json(invite)
})

app.use(function (err, req, res, next) {
  console.log(err)

  if (err instanceof NotFoundError) {
    res.status(404).json({})
  } else {
    res.status(500).json({})
  }
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
