const sample = require('lodash/sample')
const random = require('lodash/random')
const { hash } = require('../helpers/bcrypt')

const createUser = (i) => ({
  id: i,
  firstName: sample(['Angus', 'Jose']),
  lastName: sample(['Cooper', 'Butler']),
  email: `admin${i}@bugzilla.com`,
  password: hash(`admin${i}@bugzilla.com`),
  position: 'Software Engineer',
  company: 'XING',
  termsAccepted: true,
  newsletterSubscribed: false,
  photoUrl: `https://randomuser.me/api/portraits/med/men/${i}.jpg`,
  confirmed: true,
})

const createProject = (i) => ({
  id: i,
  name: `My Project ${i}`,
})

const createUserProject = (i) => ({
  id: i,
  userId: sample([1, 2]),
  projectId: i,
  role: sample(['member', 'owner']),
})

const createTask = (i) => ({
  id: i,
  description: `My Task ${i}`,
  complete: sample([true, false]),
  storyId: 1,
})

const createComment = (i) => ({
  id: i,
  content: `My Comment ${i}`,
  storyId: 1,
})

const containers = ['icebox', 'backlog']
const storyTypes = ['feature', 'bug', 'chore', 'release']
const states = ['unstarted', 'started', 'finished', 'delivered', 'rejected']

const createStory = (i) => ({
  id: i,
  name: `My Story ${i}`,
  description: 'My Description',
  projectId: random(51) + 1,
  kind: sample(storyTypes),
  container: sample(containers),
  state: sample(states),
  tasksCount: random(10),
  commentsCount: random(10),
})

module.exports = {
  createUser,
  createProject,
  createUserProject,
  createTask,
  createComment,
  createStory,
}
