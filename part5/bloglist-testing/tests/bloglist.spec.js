const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, postBlog } = require('./helper')

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
      await postBlog(page, 'Blog de prueba', 'Er Juanan', 'www.test.com')
      
      await expect(page.locator('div[datatype-testid="titleNdAuthor"]').getByText('Blog de prueba')).toBeVisible()
    })
  })

  describe('When there is one blog', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, data['username'], data['password'])
      await postBlog(page, 'Blog de prueba', 'Er Juanan', 'www.test.com')
      await page.getByRole('button', { name: 'view' }).click()
    })

    test('it can be liked', async ({ page }) => {
      const likeButton = page.getByRole('button', { name: 'Like' })

      await expect(page.getByText('0')).toBeVisible()
      await expect(likeButton).toBeVisible()

      await likeButton.click()

      await expect(page.getByText('1')).toBeVisible()
    })

    test('it can be deleted by the user who added', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'Remove' }).click()

      await expect(page.locator('div[datatype-testid="titleNdAuthor"]').getByText('Blog de prueba')).not.toBeVisible()
    })
  })
})