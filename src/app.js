const express = require('express')
const morgan = require('morgan')
const { generateToken, refreshToken } = require('./helpers/jwt')
const { requiresAuth } = require('./middleware/requiresAuth')
const {
  user,
  users,
  project,
  projects,
  task,
  tasks,
  comment,
  comments,
  story,
  stories,
} = require('./db')
const collection = require('./helpers/collection')
const { validatePassword } = require('./helpers/auth')

const app = express()
const port = 4000

app.use(morgan('dev'))
app.use(express.json())

app.post('/api/signin', (req, res) => {
  if (validatePassword(req.body)) {
    res.json({ user, token: generateToken(user) })
  } else {
    res.status(422).json({})
  }
})
app.get('/api/refresh_token', requiresAuth, (req, res) =>
  res.json({ token: refreshToken(req.token) })
)

app.post('/api/register', (req, res) => res.json(user))
app.post('/api/logout', requiresAuth, (req, res) => res.json({}))
app.get('/api/me', requiresAuth, (req, res) => res.json(user))

app.get('/api/projects', requiresAuth, (req, res) =>
  res.json(collection(projects, req))
)
app.post('/api/projects', requiresAuth, (req, res) => res.json(project))
app.get('/api/projects/:id', requiresAuth, (req, res) => res.json(project))
app.put('/api/projects/:id', requiresAuth, (req, res) => res.json(project))
app.delete('/api/projects/:id', requiresAuth, (req, res) => res.json(project))

app.get('/api/stories', requiresAuth, (req, res) =>
  res.json(collection(stories, req))
)
app.post('/api/stories', requiresAuth, (req, res) => res.json(story))
app.get('/api/stories/:id', requiresAuth, (req, res) => res.json(story))
app.put('/api/stories/:id', requiresAuth, (req, res) => res.json(story))
app.delete('/api/stories/:id', requiresAuth, (req, res) => res.json(story))

app.get('/api/tasks', requiresAuth, (req, res) =>
  res.json(collection(tasks, req))
)
app.post('/api/tasks', requiresAuth, (req, res) => res.json(task))
app.get('/api/tasks/:id', requiresAuth, (req, res) => res.json(task))
app.put('/api/tasks/:id', requiresAuth, (req, res) => res.json(task))
app.delete('/api/tasks/:id', requiresAuth, (req, res) => res.json(task))

app.get('/api/comments', requiresAuth, (req, res) =>
  res.json(collection(comments))
)
app.post('/api/comments', requiresAuth, (req, res) => res.json(comment))
app.get('/api/comments/:id', requiresAuth, (req, res) => res.json(comment))
app.put('/api/comments/:id', requiresAuth, (req, res) => res.json(comment))
app.delete('/api/comments/:id', requiresAuth, (req, res) => res.json(comment))

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
