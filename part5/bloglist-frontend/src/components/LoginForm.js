import PT from 'prop-types'

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type={'text'}
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="username"
          />
        </div>
        <div>
          password
          <input
            type={'password'}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="password"
          />
        </div>
        <div>
          <button type={'submit'}>Login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PT.string.isRequired,
  password: PT.string.isRequired,
  setUsername: PT.func.isRequired,
  setPassword: PT.func.isRequired,
  handleLogin: PT.func.isRequired
}

export default LoginForm
