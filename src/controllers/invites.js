const create = (req, res) => {
  const senderId = req.user.id
  const recipientId = null
  const invite = { ...req.body, senderId, recipientId }
  res.json(invite)
}

module.exports = { create }
