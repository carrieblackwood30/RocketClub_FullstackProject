const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  visitsLeft: { type: Number, default: 0 }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)