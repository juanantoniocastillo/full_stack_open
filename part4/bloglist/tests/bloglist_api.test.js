const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned in JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('all blogs has id property and not _id', async () => {
  const response = await api.get('/api/blogs')

  for (const blog of response.body){
    assert.strictEqual(Object.hasOwn(blog, 'id'), true)
    assert.strictEqual(Object.hasOwn(blog, '_id'), false)
  }
})

after(async () => {
  await mongoose.connection.close()
})