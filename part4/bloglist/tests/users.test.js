const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

describe('when there is initially one user saved', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secretPassword22', 10)

    const user = new User({
      username: 'root',
      name: 'Root User',
      passwordHash,
    })

    await user.save()
  })

  test('a new user is correctly added and answered with status 201 Created', async () => {
    const newUser = {
      username: 'pakito',
      name: 'Paco Martinez',
      password: 'secretpassword1',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtTheEnd = await helper.usersInDb()
    assert.strictEqual(usersAtTheEnd.length, 2)

    const usernamesAtTheEnd = usersAtTheEnd.map(user => user.username)
    assert(usernamesAtTheEnd.includes('pakito'))
  })

  test('a new user with username missing is rejected with status 400 Bad Request', async () => {
    const newUser = {
      name: 'Paco Martinez',
      password: 'secretpassword1',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtTheEnd = await helper.usersInDb()
    assert.strictEqual(usersAtTheEnd.length, 1)

    assert(result.body.error.includes('`username` is required'))
  })

  test('a new user with password missing is rejected with status 400 Bad Request', async () => {
    const newUser = {
      username: 'pakito',
      name: 'Paco Martinez',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtTheEnd = await helper.usersInDb()
    assert.strictEqual(usersAtTheEnd.length, 1)

    assert(result.body.error.includes('`password` is required'))
  })

  test('a new user with username and password missing is rejected with status 400 Bad Request', async () => {
    const newUser = {
      name: 'Paco Martinez',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtTheEnd = await helper.usersInDb()
    assert.strictEqual(usersAtTheEnd.length, 1)

    assert(result.body.error.includes('`username` and `password` are required'))
  })

  test('a new user with a username length less than 3 characters is rejected with status 400 Bad Request', async () => {
    const newUser = {
      username: 'pa',
      name: 'Paco Martinez',
      password: 'secretpassword1',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtTheEnd = await helper.usersInDb()
    assert.strictEqual(usersAtTheEnd.length, 1)

    assert(result.body.error.includes('username'))
    assert(result.body.error.includes('is shorter than the minimum allowed length'))
  })

  test('a new user with a password length less than 3 characters is rejected with status 400 Bad Request', async () => {
    const newUser = {
      username: 'pakito',
      name: 'Paco Martinez',
      password: 'se',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtTheEnd = await helper.usersInDb()
    assert.strictEqual(usersAtTheEnd.length, 1)

    assert(result.body.error.includes('password length should be at least 3 characters'))
  })

  test('an existing username is rejected with status 400 Bad Request', async () => {
    const newUser = {
      username: 'root',
      name: 'Root User',
      password: 'secretpassword1',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtTheEnd = await helper.usersInDb()
    assert.strictEqual(usersAtTheEnd.length, 1)

    assert(result.body.error.includes('expected `username` to be unique'))
  })

})

after(async () => {
  await mongoose.connection.close()
})