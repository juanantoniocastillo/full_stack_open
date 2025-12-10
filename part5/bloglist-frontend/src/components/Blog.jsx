import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const buttonText = visible ? 'Hide' : 'View'
  const showWhenVisible = { display: visible ? '' : 'none' }

  const removeVisible = { display: user.username === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = async () => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }

    const response = await blogService.updateLikes(blogToUpdate)

    if (response) {
      const updatedBlogs = blogs.map(iterableBlog => {
        if (iterableBlog.id === blog.id) {
          return {...iterableBlog, likes: iterableBlog.likes + 1}
        } else {
          return iterableBlog
        }
      })

      const updatedReorderedBlogs = updatedBlogs.toSorted((a, b) => b.likes - a.likes)
      
      setBlogs(updatedReorderedBlogs)
    }

  }

  const handleRemoveClick = async () => {
    if (window.confirm(`You are going to delete ${blog.title} by ${blog.author}. Do you want to proceed?`)) {
      await blogService.deleteBlog(blog)

      const updatedBlogs = blogs.filter(b => b.id !== blog.id)

      setBlogs(updatedBlogs)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button onClick={handleLikeClick}>Like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={removeVisible}>
          <button onClick={handleRemoveClick}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog