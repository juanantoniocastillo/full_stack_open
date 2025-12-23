import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('The component displaying a blog', () => {
  beforeEach(() => {
    const blogs = [
      {
        'title': 'Blog de Juanan',
        'author': 'Juanan',
        'url': 'www.juanan.com',
        'likes': 2,
        'user': {
          'username': 'juanan38',
          'name': 'Juan Antonio',
          'id': '6908827eac076f59efa3436e'
        },
        'id': '690ae1850a61f04d428d27a6'
      },
      {
        'title': 'Blog de Irene',
        'author': 'Irene',
        'url': 'www.irene.com',
        'likes': 7,
        'user': {
          'username': 'juanan38',
          'name': 'Juan Antonio',
          'id': '6908827eac076f59efa3436e'
        },
        'id': '690ae21a236b9b71797f4afc'
      },
    ]

    const blog = blogs[0]

    const mockHandler = vi.fn()

    const user = {
      username: 'juanan38'
    }

    render(<Blog blog={blog} blogs={blogs} setBlogs={mockHandler} user={user} />)
  })

  test('renders blog title and author', () => {
    screen.queryByTestId('titleNdAuthor')
  })

  test('does not render url by default', () => {
    const element = screen.getByText('www.juanan.com')
    expect(element).not.toBeVisible()
  })

  test('does not render likes by default', () => {
    const element = screen.getByText('2')
    expect(element).not.toBeVisible()
  })

  test('renders url and likes after clicking View button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const urlElement = screen.getByText('www.juanan.com')
    expect(urlElement).toBeVisible()

    const likesElement = screen.getByText('2')
    expect(likesElement).toBeVisible()
  })
})