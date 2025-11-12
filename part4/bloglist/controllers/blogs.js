const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {

  const body = req.body

  if (!body.title || !body.author || !body.url) {
    return res.status(400).json({
      error: 'Title, author or url missing.'
    })
  }

  const user = req.user

  if (!user) {
    return res.status(400).json({ error: 'UserId missing or not valid' })
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id
  })

  const savedBlog = await newBlog.save()

  user.blogs =  user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {

  const user = req.user

  if (!user) {
    return res.status(400).json({ error: 'UserId missing or not valid' })
  }

  const blogToDelete = await Blog.findById(req.params.id)

  if (!blogToDelete) {
    return res.status(404).end()
  }

  if (blogToDelete.user.toString() === user.id) {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id)

    if (!deletedBlog) {
      res.status(404).end()
    } else {
      res.status(204).end()
    }
  } else {
    res.status(401).json({ error: 'Only blog\'s creator can delete it' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const blogToUpdate = await Blog.findById(req.params.id)

  if (!blogToUpdate) {
    return res.status(404).end()
  }

  blogToUpdate.likes = req.body.likes

  const updatedBlog = await blogToUpdate.save()

  res.json(updatedBlog)
})

module.exports = blogsRouter