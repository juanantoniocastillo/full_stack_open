import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'
import NewBlogForm from './NewBlogForm'

vi.mock('../services/blogs')

describe('The new blog form', () => {
  const mockSetBlogs = vi.fn()
  const mockNotificationMessage = vi.fn()
  const mockToggleVisibility = vi.fn()

  const mockRef = { current: { toggleVisibility: mockToggleVisibility } }

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

  const newBlog = {
    'title': 'Blog de Prueba',
    'author': 'Prueba',
    'url': 'www.prueba.com',
    'likes': 4,
    'user': {
      'username': 'juanan38',
      'name': 'Juan Antonio',
      'id': '6908827eac076f59efa3436e'
    },
    'id': '690ae1850a61f04d428d2787'
  }

  beforeEach(async () => {
    vi.clearAllMocks()

    blogService.create.mockResolvedValue(newBlog)

    render(<NewBlogForm blogs={blogs} setBlogs={mockSetBlogs} setNotificationMessage={mockNotificationMessage} newBlogFormRef={mockRef} />)

    const user = userEvent.setup()
    const titleIn = screen.getByLabelText('title')
    const authorIn = screen.getByLabelText('author')
    const urlIn = screen.getByLabelText('url')
    const createButton = screen.getByText('Create')

    await user.type(titleIn, newBlog.title)
    await user.type(authorIn, newBlog.author)
    await user.type(urlIn, newBlog.url)
    await user.click(createButton)
  })

  test('calls the blogService with the right props', () => {
    const expectedNewBlog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    expect(blogService.create).toHaveBeenCalledWith(expectedNewBlog)
  })

  test('update blogs correctly', () => {
    expect(mockSetBlogs.mock.calls).toHaveLength(1)
    expect(mockSetBlogs.mock.calls[0][0]).toStrictEqual(blogs.concat(newBlog))
  })
})