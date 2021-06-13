const fillArray = require('../helpers/fillArray')

const createModel = ({ factory, count = 0 }) => {
  let items = fillArray(factory, count)
  const all = () => items
  const find = (id) => items.find((x) => x.id == id)
  const findBy = (filters) => {
    for (const [key, value] of Object.entries(filters)) {
      return items.find((x) => x[key] === value)
    }
  }
  const create = (attrs) => {
    const lastObj = items.slice(-1)[0]
    const lastId = lastObj.id
    const id = lastId + 1
    const obj = Object.assign({}, { id }, attrs)

    items.push(obj)

    return obj
  }
  const update = (id, attrs) => {
    const index = items.findIndex((x) => x.id == id)
    const result = items[index]
    const newObj = Object.assign({}, result, attrs)

    items[index] = newObj

    return newObj
  }
  const remove = (id) => {
    const obj = items.find((x) => x.id == id)
    if (!obj) {
      return
    }

    items = items.filter((x) => x.id != id)
    console.log(items)

    return obj
  }

  return { all, find, findBy, create, update, remove }
}

module.exports = createModel
