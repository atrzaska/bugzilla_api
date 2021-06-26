const fillArray = require('./fillArray')
const { NotFoundError } = require('./errors')

const createModel = ({ factory, count = 0 }) => {
  let items = fillArray(factory, count)
  const all = () => items
  const find = (id) => {
    const result = items.find((x) => x.id == id)

    if (!result) {
      throw new NotFoundError()
    }

    return result
  }
  const where = (filters) => {
    for (const [key, value] of Object.entries(filters)) {
      return items.filter((x) => [value].flat().includes(x[key]))
    }
  }
  const findBy = (filters) => {
    for (const [key, value] of Object.entries(filters)) {
      return items.find((x) => [value].flat().includes(x[key]))
    }
  }
  const create = (attrs) => {
    const lastObj = items.slice(-1)[0]
    const lastId = lastObj.id
    const id = lastId + 1
    const obj = { ...attrs, id }

    items.push(obj)

    return obj
  }
  const update = (id, attrs) => {
    const index = items.findIndex((x) => x.id == id)
    const result = items[index]
    const newObj = { ...result, ...attrs }

    items[index] = newObj

    return newObj
  }
  const remove = (id) => {
    const obj = items.find((x) => x.id == id)
    if (!obj) {
      return
    }

    items = items.filter((x) => x.id != id)

    return obj
  }

  return { all, find, where, findBy, create, update, remove }
}

module.exports = createModel
