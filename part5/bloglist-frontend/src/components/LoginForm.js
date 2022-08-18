const LoginForm = ({
  username,
  setUsername,
  password,
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
            type={"text"}
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name="username"
          />
        </div>
        <div>
          password
          <input
            type={"password"}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name="password"
          />
        </div>
        <div>
          <button type={"submit"}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
