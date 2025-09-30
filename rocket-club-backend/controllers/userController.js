const User = require('../models/User')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'email visitsLeft') // ← только нужные поля
    res.status(200).json(users)
  } catch (err) {
    console.error('❌ Ошибка при получении пользователей:', err.message)
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}
