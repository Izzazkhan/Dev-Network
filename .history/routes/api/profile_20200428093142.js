const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }
    res.json(profile)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('state', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // const { name, email, phone, type } = req.body

    // try {
    //   const newContact = new Contact({
    //     name,
    //     email,
    //     phone,
    //     type,
    //     user: req.user.id,
    //   })

    //   const contact = await newContact.save()

    //   res.json(contact)
    // } catch (err) {
    //   console.error(err.message)
    //   res.send(500).send('Server Error')
    // }
  }
)

module.exports = router
