const { test, after, beforeEach, describe } = require('node:test')
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

describe('all blogs', () => {

  test('are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('has id property and not _id', async () => {
    const response = await api.get('/api/blogs')

    for (const blog of response.body){
      assert.strictEqual(Object.hasOwn(blog, 'id'), true)
      assert.strictEqual(Object.hasOwn(blog, '_id'), false)
    }
  })
})

describe('a request', () => {

  test('of a new valid blog is correctly added', async () => {
    const newBlog = {
      title: 'El blog de Juanan',
      author: 'Juan Antonio Castillo',
      url: 'http://elblogdejuananinventado.com',
      likes: 6,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtTheEnd.length,   helper.initialBlogs.length + 1)

    const titles = blogsAtTheEnd.map(n => n.title)
    assert(titles.includes('El blog de Juanan'))
  })

  test('without likes property is assigned to 0', async () => {
    const newBlog = {
      title: 'El blog de Juanan',
      author: 'Juan Antonio Castillo',
      url: 'http://elblogdejuananinventado.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtTheEnd = await helper.blogsInDb()
    const addedBlog = blogsAtTheEnd.find(blog => blog.title === 'El blog de Juanan')

    assert.strictEqual(Object.hasOwn(addedBlog, 'likes'), true)
    assert.strictEqual(addedBlog.likes, 0)

  })

  test('without title property is answered with 400 Bad Request', async () => {
    const newBlog = {
      author: 'Juan Antonio Castillo',
      url: 'http://elblogdejuananinventado.com',
      likes: 6,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

  test('without url property is answered with 400 Bad Request', async () => {
    const newBlog = {
      title: 'El blog de Juanan',
      author: 'Juan Antonio Castillo',
      likes: 6,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

})

after(async () => {
  await mongoose.connection.close()
})