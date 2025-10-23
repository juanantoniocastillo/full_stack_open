const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body

  if (!body.title || !body.author || !body.url) {
    return res.status(400).json({
      error: 'Title, author or url missing.'
    })
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  })

  const savedBlog = await newBlog.save()
  res.status(201).json(savedBlog)
})

module.exports = blogsRouter