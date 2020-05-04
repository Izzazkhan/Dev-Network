const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/', auth, async (req, res) => {})

module.exports = router
