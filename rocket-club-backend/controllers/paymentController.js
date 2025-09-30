const User = require('../models/User')

exports.fakePayment = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

    const addedVisits = 10
    user.visitsLeft += addedVisits
    await user.save()

    res.json({
      message: `Оплата прошла успешно. Добавлено ${addedVisits} посещений.`,
      visitsLeft: user.visitsLeft
    })
  } catch (err) {
    res.status(500).json({ message: 'Ошибка обработки оплаты', details: err.message })
  }
}