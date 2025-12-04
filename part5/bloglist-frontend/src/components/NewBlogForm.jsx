import { useState } from 'react'
import blogService from '../services/blogs'
// Exercise 6 already done
const NewBlogForm = ({ blogs, setBlogs, setNotificationMessage, newBlogFormRef }) => {

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

    setBlogs(blogs.concat(returnedBlog))

    setNotificationMessage({ message: `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, error: false })
      setTimeout(() => {
        setNotificationMessage({ message: null, error: false })
      }, 5000)
    
    setTittle('')
    setAuthor('')
    setUrl('')
    newBlogFormRef.current.toggleVisibility()
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