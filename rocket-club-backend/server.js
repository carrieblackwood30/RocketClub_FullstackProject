const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const authRoutes = require('./routes/auth')
const visitRoutes = require('./routes/visits')
const paymentRoutes = require('./routes/payment')

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err))

app.use('/api/auth', authRoutes)
app.use('/api/visits', visitRoutes)
app.use('/api/payment', paymentRoutes)

app.get('/', (req, res) => {
  res.send('🚀 rocketlab backend работает')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))