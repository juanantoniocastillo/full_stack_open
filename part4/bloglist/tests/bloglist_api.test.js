const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const newUser = {
      username: 'admin',
      name: 'Admin',
      password: 'pass'
    }

    const savedUser = await api
      .post('/api/users')
      .send(newUser)

    const adminUser = await User.findById(savedUser.body.id)

    const newBlog = new Blog({
      title: 'El blog de Juanan',
      author: 'Juanan',
      url: 'www.juanan.com',
      likes: 12,
      user: adminUser._id
    })

    await newBlog.save()
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

      assert.strictEqual(response.body.length, 1)
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
      const userToLog = {
        username: 'admin',
        password: 'pass'
      }
      const token = await helper.loginUser(api, userToLog)
      assert(token)

      const newBlog = {
        title: 'El blog de Manolo',
        author: 'Manolito gafotas',
        url: 'http://manolitogafotas.com',
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtTheEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtTheEnd.length,   2)

      const titles = blogsAtTheEnd.map(n => n.title)
      assert(titles.includes('El blog de Manolo'))
    })

    test('without likes property is assigned to 0', async () => {
      const userToLog = {
        username: 'admin',
        password: 'pass'
      }

      const token = await helper.loginUser(api, userToLog)
      assert(token)

      const newBlog = {
        title: 'El blog de Lewis',
        author: 'Lewis Castillo',
        url: 'http://lewis.com',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtTheEnd = await helper.blogsInDb()
      const addedBlog = blogsAtTheEnd.find(blog => blog.title === 'El blog de Lewis')

      assert.strictEqual(Object.hasOwn(addedBlog, 'likes'), true)
      assert.strictEqual(addedBlog.likes, 0)

    })

    test('without title property is answered with 400 Bad Request', async () => {
      const userToLog = {
        username: 'admin',
        password: 'pass'
      }

      const token = await helper.loginUser(api, userToLog)
      assert(token)

      const newBlog = {
        author: 'Federico Garcia Lorca',
        url: 'http://lorca.com',
        likes: 3,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

    })

    test('without url property is answered with 400 Bad Request', async () => {
      const userToLog = {
        username: 'admin',
        password: 'pass'
      }

      const token = await helper.loginUser(api, userToLog)
      assert(token)

      const newBlog = {
        title: 'Fast and Happy',
        author: 'Er Juanan',
        likes: 1,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

    })

    test('without token is rejected with 401 Unauthorized', async () => {
      const newBlog = {
        title: 'El blog de Manolo',
        author: 'Manolito gafotas',
        url: 'http://manolitogafotas.com',
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    })

  })

  describe('a delete request', () => {

    test('to an existing id is successfully deleted', async () => {
      const blogsAtTheBeginning = await helper.blogsInDb()
      const idToDelete = blogsAtTheBeginning[0].id

      const userToLog = {
        username: 'admin',
        password: 'pass'
      }

      const token = await helper.loginUser(api, userToLog)
      assert(token)

      await api
        .delete(`/api/blogs/${idToDelete}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtTheEnd = await helper.blogsInDb()
      const deletedBlog = blogsAtTheEnd.find(blog => blog.id === idToDelete)

      assert.strictEqual(deletedBlog, undefined)
    })

    test('to an already deleted id is answered with 404 Not Found', async () => {
      const blogsAtTheBeginning = await helper.blogsInDb()
      const idToDelete = blogsAtTheBeginning[0].id

      const userToLog = {
        username: 'admin',
        password: 'pass'
      }

      const token = await helper.loginUser(api, userToLog)
      assert(token)

      await api
        .delete(`/api/blogs/${idToDelete}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      await api
        .delete(`/api/blogs/${idToDelete}`)
        .set('Authorization', `Bearer ${token}`)
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