const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {

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

  describe('a post request', () => {

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

  describe('a delete request', () => {

    test('to an existing id is successfully deleted', async () => {
      const blogsAtTheBeginning = await helper.blogsInDb()
      const idToDelete = blogsAtTheBeginning[0].id

      await api
        .delete(`/api/blogs/${idToDelete}`)
        .expect(204)

      const blogsAtTheEnd = await helper.blogsInDb()
      const deletedBlog = blogsAtTheEnd.find(blog => blog.id === idToDelete)

      assert.strictEqual(deletedBlog, undefined)
    })

    test('to an already deleted id is answered with 404 Not Found', async () => {
      const blogsAtTheBeginning = await helper.blogsInDb()
      const idToDelete = blogsAtTheBeginning[0].id

      await api
        .delete(`/api/blogs/${idToDelete}`)
        .expect(204)

      await api
        .delete(`/api/blogs/${idToDelete}`)
        .expect(404)

    })

  })

  describe('a put request', () => {

    test('to an existing id is successfully updated', async () => {
      const blogsAtTheBeginning = await helper.blogsInDb()

      const blogToUpdate = { ...blogsAtTheBeginning[0], likes: 99 }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtTheEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtTheEnd.find(blog => blog.id === blogToUpdate.id)

      assert.strictEqual(updatedBlog.likes, 99)
    })

    test('to wrong id is answered with 404 Not Found', async () => {
      const blogsAtTheBeginning = await helper.blogsInDb()

      const blogToUpdate = { ...blogsAtTheBeginning[0], likes: 99, id: '5a422a851b54a676234d17f7' }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(404)
    })

  })
})

after(async () => {
  await mongoose.connection.close()
})