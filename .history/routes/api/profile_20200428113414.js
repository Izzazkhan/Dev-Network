const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
const Profile = require('../../models/Profile')

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    })

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    // only populate from user document if profile exists
    res.json(profile.populate('user', ['name', 'avatar']))
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
    //   check('skills', 'Skills is required').not().isEmpty(),
    // ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const {
      company,
      location,
      website,
      bio,
      // skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body

    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    // Skills - Spilt into array
    // if (skills) {
    //   profileFields.skills = skills.split(',').map((skill) => skill.trim())
    // }

    // Build Social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }

      // Create
      profile = new Profile(profile)

      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
// router.get('/', async (req, res) => {
//   try {
//     const profiles = await Profile.find().populate('user', ['name', 'avatar'])
//     res.json(profiles)
//   } catch (err) {
//     console.log(err.message)
//     res.status(500).send('Server Error')
//   }
//   const errors = {}

//   Profile.find()
//     .populate('user', ['name', 'avatar'])
//     .then((profiles) => {
//       if (!profiles) {
//         errors.noprofile = 'There are no profiles'
//         return res.status(404).json(errors)
//       }

//       res.json(profiles)
//     })
//     .catch((err) => res.status(404).json({ profile: 'There are no profiles' }))
// })

module.exports = router
