const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, postBlog } = require('./helper')

const user1 = {
  "username": "admin",
  "name": "Administrator",
  "password": "cambiar"
}

const user2 = {
  "username": "second",
  "name": "Second User",
  "password": "pass"
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', { data: user1 })

    await page.goto('/')
  })

  test('Login form is shown by default', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, user1['username'], user1['password'])

      await expect(page.getByText('Administrator is logged in.')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, user1['username'], 'wrong')

      await expect(page.getByText('Wrong credentials.')).toBeVisible()
      await expect(page.getByText('Administrator is logged in.')).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'Log out' })).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user1['username'], user1['password'])
    })

    test('a new blog can be created', async ({ page }) => {
      await postBlog(page, 'Blog de prueba', 'Er Juanan', 'www.test.com')
      
      await expect(page.locator('div[datatype-testid="titleNdAuthor"]').getByText('Blog de prueba')).toBeVisible()
    })
  })

  describe('When there is one blog', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user1['username'], user1['password'])
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

    test('it can not be deleted by a user who does not added it', async ({ page, request }) => {
      await request.post('/api/users', { data: user2 })
      await page.getByRole('button', { name: 'Log out' }).click()

      await loginWith(page, user2['username'], user2['password'])
      await expect(page.getByText('Second User is logged in.')).toBeVisible()

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
    })
  })

  describe('When there is three blogs', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user1['username'], user1['password'])
      await postBlog(page, 'BlogOne', 'Er Juanan', 'www.testone.com')
      await postBlog(page, 'BlogTwo', 'Er Michel', 'www.testtwo.com')
      await postBlog(page, 'BlogThree', 'La mikaela', 'www.testthree.com')
    })

    test('they are ordered according to the likes', async ({ page }) => {
      const blogTwoLocator = page.locator('div[datatype-testid="titleNdAuthor"]').getByText('BlogTwo').locator('..')
      await blogTwoLocator.getByRole('button', { name: 'view' }).click()
      const blogTwoLikeButton = blogTwoLocator.getByRole('button', { name: 'Like' })
      await blogTwoLikeButton.click()
      await blogTwoLocator.getByText('1').waitFor()
      await blogTwoLikeButton.click()
      await blogTwoLocator.getByText('2').waitFor()
      await blogTwoLikeButton.click()
      await blogTwoLocator.getByText('3').waitFor()

      await expect(blogTwoLocator.getByText('3')).toBeVisible()

      const blogThreeLocator = page.locator('div[datatype-testid="titleNdAuthor"]').getByText('BlogThree').locator('..')
      await blogThreeLocator.getByRole('button', { name: 'view' }).click()
      const blogThreeLikeButton = blogThreeLocator.getByRole('button', { name: 'Like' })
      await blogThreeLikeButton.click()
      await blogThreeLocator.getByText('1').waitFor()
      await blogThreeLikeButton.click()
      await blogThreeLocator.getByText('2').waitFor()

      await expect(blogThreeLocator.getByText('2')).toBeVisible()

      const blogList = await page.locator('div[datatype-testid="titleNdAuthor"]').all()

      await expect(blogList[0]).toContainText('BlogTwo')
      await expect(blogList[1]).toContainText('BlogThree')
      await expect(blogList[2]).toContainText('BlogOne')
    })
  })
})