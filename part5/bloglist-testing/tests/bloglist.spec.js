const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

const data = {
  "username": "admin",
  "name": "Administrator",
  "password": "cambiar"
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', { data })

    await page.goto('/')
  })

  test('Login form is shown by default', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, data['username'], data['password'])

      await expect(page.getByText('Administrator is logged in.')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, data['username'], 'wrong')

      await expect(page.getByText('Wrong credentials.')).toBeVisible()
      await expect(page.getByText('Administrator is logged in.')).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'Log out' })).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, data['username'], data['password'])
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'New Blog' }).click()

      await page.getByLabel('title').fill('Blog de prueba')
      await page.getByLabel('author').fill('Er Juanan')
      await page.getByLabel('url').fill('www.test.com')
      await page.getByRole('button', { name: 'Create' }).click()
      
      await expect(page.locator('div[datatype-testid="titleNdAuthor"]').getByText('Blog de prueba')).toBeVisible()
    })
  })
})