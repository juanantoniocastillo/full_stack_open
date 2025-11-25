import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import LoginInfo from './components/LoginInfo'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({ message: null, error: false })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (!user) {
    return (
      <div>
        <Notification notificationMessage={notificationMessage} />
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} setNotificationMessage={setNotificationMessage} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notificationMessage={notificationMessage} />
      <LoginInfo name={user.name} setUser={setUser} />
      <NewBlogForm blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App