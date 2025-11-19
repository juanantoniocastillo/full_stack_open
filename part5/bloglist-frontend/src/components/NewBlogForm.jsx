import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs }) => {

  const [title, setTittle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async event => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url
    }

    const returnedBlog = await blogService.create(newBlog)

    console.log('blogs:', blogs.concat(returnedBlog))

    setBlogs(blogs.concat(returnedBlog))
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            tittle
            <input
              type='text'
              value={title}
              onChange={({ target }) => setTittle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type='text'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type='text'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default NewBlogForm