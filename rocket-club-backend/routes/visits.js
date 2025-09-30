const express = require('express')
const router = express.Router()
const visitController = require('../controllers/visitController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, visitController.getVisits)
router.post('/use', authMiddleware, visitController.useVisit)

module.exports = router