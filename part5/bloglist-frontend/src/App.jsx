import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import ErrorNotification from './components/ErrorNotification'
import LoginInfo from './components/LoginInfo'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        <ErrorNotification errorMessage={errorMessage} />
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} setErrorMessage={setErrorMessage} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <LoginInfo name={user.name} setUser={setUser} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App