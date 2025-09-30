const User = require('../models/User')

exports.getVisits = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.json({ visitsLeft: user.visitsLeft })
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения посещений', details: err.message })
  }
}

exports.useVisit = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (user.visitsLeft <= 0) {
      return res.status(400).json({ message: 'Нет доступных посещений' })
    }
    user.visitsLeft -= 1
    await user.save()
    res.json({ message: 'Посещение списано', visitsLeft: user.visitsLeft })
  } catch (err) {
    res.status(500).json({ message: 'Ошибка списания посещения', details: err.message })
  }
}