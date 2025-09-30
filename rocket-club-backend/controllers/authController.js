const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      password: hashedPassword,
      visitsLeft: 10
    })

    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(201).json({
      token,
      user: {
        email: newUser.email,
        visitsLeft: newUser.visitsLeft
      }
    })
  } catch (err) {
    console.error('❌ Registration error:', err.message)
    res.status(500).json({ message: 'Server error during registration' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

    res.status(200).json({
      token,
      user: {
        email: user.email,
        visitsLeft: user.visitsLeft
      }
    })
  } catch (err) {
    console.error('❌ Login error:', err.message)
    res.status(500).json({ message: 'Server error during login' })
  }
}

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({
      email: user.email,
      visitsLeft: user.visitsLeft
    })
  } catch (err) {
    console.error('❌ getMe error:', err.message)
    res.status(500).json({ message: 'Server error while fetching user' })
  }
}