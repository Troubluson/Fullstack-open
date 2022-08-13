import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService  from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      console.log(error.message)
    }
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username 
            <input type={'text'} value={username} onChange={({target}) => setUsername(target.value)} name="username" /> 
          </div>
          <div>
            password 
            <input type={'password'} value={password} onChange={({target}) => setPassword(target.value)} name="password" /> 
          </div>
          <div>
            <button type={'submit'}>Login</button>
          </div>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App