const sample = require('lodash/sample')
const random = require('lodash/random')
const { hash } = require('../helpers/bcrypt')

const createUser = (i) => ({
  id: i,
  firstName: `John ${i}`,
  lastName: 'Doe',
  email: `admin${i}@bugzilla.com`,
  password: hash(`password${i}`),
  position: 'Software Engineer',
  company: 'XING',
  photoUrl:
    'https://scontent-frt3-1.xx.fbcdn.net/v/t31.18172-0/c0.41.1365.1365a/s552x414/10511425_862637390432170_5214547792529231302_o.jpg?_nc_cat=108&ccb=1-3&_nc_sid=da31f3&_nc_ohc=5Q1ySGbk1jkAX8JelA9&_nc_ht=scontent-frt3-1.xx&tp=28&oh=e4488115ee77fa5789272ebb005b4085&oe=60DED19C',
})

const createProject = (i) => ({
  id: i,
  name: `My Project ${i}`,
  slug: `my-project-${i}`,
})

const createTask = (i) => ({
  id: i,
  description: `My Task ${i}`,
  complete: sample([true, false]),
  story_id: 1,
})

const createComment = (i) => ({
  id: i,
  content: `My Comment ${i}`,
  story_id: 1,
})

const containers = ['icebox', 'backlog']
const storyTypes = ['feature', 'bug', 'chore', 'release']
const states = ['unstarted', 'started', 'finished', 'delivered', 'rejected']

const createStory = (i) => ({
  id: i,
  name: `My Story ${i}`,
  description: 'My Description',
  project_id: 1,
  kind: sample(storyTypes),
  container: sample(containers),
  state: sample(states),
  tasksCount: random(10),
  commentsCount: random(10),
})

module.exports = {
  createUser,
  createProject,
  createTask,
  createComment,
  createStory,
}
