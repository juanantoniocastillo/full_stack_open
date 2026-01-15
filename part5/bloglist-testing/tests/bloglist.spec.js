const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        "username": "admin",
        "name": "Administrator",
        "password": "cambiar"
      }
    })

    await page.goto('/')
  })

  test('Login form is shown by default', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('admin')
      await page.getByLabel('password').fill('cambiar')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Administrator is logged in.')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('admin')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong credentials.')).toBeVisible()
      await expect(page.getByText('Administrator is logged in.')).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'Log out' })).not.toBeVisible()
    })
  })
})