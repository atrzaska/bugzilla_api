const fillArray = (fn, len) => {
  const arr = []

  for (var i = 0; i < len; i++) {
    arr.push(fn(i + 1))
  }

  return arr
}

module.exports = fillArray
