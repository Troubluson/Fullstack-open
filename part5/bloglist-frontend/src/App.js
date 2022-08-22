import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const LOGGED_IN_USER = 'loggedInUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationContent, setNotificationContent] = useState({
    message: null,
    messageType: null,
  })

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a,b) => a.likes < b.likes)))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(LOGGED_IN_USER)
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
      setNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    try {
      setUser(null)
      window.localStorage.removeItem(LOGGED_IN_USER)
      blogService.removeToken()
    } catch (error) {
      console.log(error.message)
    }
  }

  const setNotification = (message, messageType) => {
    // sets message and type
    setNotificationContent({ message, messageType })

    // clears them after 5s
    setTimeout(() => {
      setNotificationContent({ message: null, messageType: null })
    }, 5000)
  }

  const createBlog = async (title, author, url) => {
    try {
      const blog = {
        title,
        author,
        url,
      }
      const newBlog = await blogService.create(blog)
      setBlogs([...blogs, newBlog])
      let message = `Successfully added blog: "${newBlog.title}", by: ${newBlog.author}`
      setNotification(message, 'success')
    } catch (error) {
      console.log(error.message)
      setNotification('Could not create new blog', 'error')
    }
  }

  const updateBlog = async (updatedBlogObject) => {
    try {
      const updatedBlog = await blogService.update(updatedBlogObject)
      const newBlogs = blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      setBlogs(newBlogs)
    } catch (error) {
      console.log(error.message)
      setNotification('Could not update blog', 'error')
    }
  }
  const likeBlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await updateBlog(updatedBlog)

  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      const newBlogs = blogs.filter((blog) => (blog.id !== blogId))
      setBlogs(newBlogs)
    } catch (error) {
      console.log(error.message)
      setNotification('Could not delete blog', 'error')
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification
          message={notificationContent.message}
          messageType={notificationContent.messageType}
        />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification
        message={notificationContent.message}
        messageType={notificationContent.messageType}
      />
      <h2>blogs</h2>
      <div>
        logged in as {user.username}{' '}
        <button name="logout" onClick={handleLogout} value="logout">
          Logout
        </button>
      </div>
      <Togglable name="new Blog">
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.sort((a,b) => a.likes < b.likes).map((blog) => (
          <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
        ))}
      </div>
    </div>
  )
}

export default App
