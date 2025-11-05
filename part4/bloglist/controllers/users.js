const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (!password) {
    if (!username) {
      return res.status(400).json({ error: '`username` and `password` are required' })
    } else {
      return res.status(400).json({ error: '`password` is required' })
    }
  }

  if (password.length < 3) {
    return res.status(400).json({ error: 'password length should be at least 3 characters' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter