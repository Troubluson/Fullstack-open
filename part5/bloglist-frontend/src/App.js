import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const LOGGED_IN_USER = "loggedInUser";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationContent, setNotificationContent] = useState({
    message: null,
    messageType: null,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(LOGGED_IN_USER);
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
      setNotification("wrong username or password", "error");
    }
  };

  const handleLogout = (event) => {
    try {
      setUser(null);
      window.localStorage.removeItem(LOGGED_IN_USER);
      blogService.removeToken();
    } catch (error) {
      console.log(error.message);
    }
  };

  const setNotification = (message, messageType) => {
    // sets message and type
    setNotificationContent({ message, messageType });

    // clears them after 5s
    setTimeout(() => {
      setNotificationContent({ message: null, messageType: null });
    }, 5000);
  };

  const createBlog = async (title, author, url) => {
    try {
      const blog = {
        title,
        author,
        url,
      };
      const newBlog = await blogService.create(blog);

      let message = `Successfully added blog: "${newBlog.title}", by: ${newBlog.author}`;
      setNotification((message, "success"));
    } catch (error) {
      console.log(error.message);
      let message = "Could not create new blog";

      setNotification(message, "error");
    }
  };

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
    );
  }

  return (
    <div>
      <Notification
        message={notificationContent.message}
        messageType={notificationContent.messageType}
      />
      <h2>blogs</h2>
      <div>
        logged in as {user.username}{" "}
        <button name="logout" onClick={handleLogout} value="logout">
          Logout
        </button>
      </div>
      <NewBlogForm createBlog={createBlog} />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
