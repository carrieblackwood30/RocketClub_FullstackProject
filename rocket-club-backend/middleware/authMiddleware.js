const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Токен не предоставлен' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Токен истёк' })
        }
        return res.status(401).json({ message: 'Неверный токен доступа' })
      }

      req.userId = decoded.id
      next()
    })
  } catch (err) {
    res.status(500).json({ message: 'Ошибка авторизации' })
  }
}

module.exports = authMiddleware