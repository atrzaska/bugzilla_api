const sendRefreshTokenCookie = (res, token) =>
  res.cookie('jid', token, { httpOnly: true, path: '/api/refresh_token' })

module.exports = sendRefreshTokenCookie
