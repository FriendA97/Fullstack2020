import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleCreateBlog = async (newBlog) => {
    const blog = await blogService.create(newBlog);
    console.log(blog);
    const newBlogs = [...blogs, blog];
    setBlogs(newBlogs);
    setSuccessMessage("a new blog has been added");
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const blogsDetails = () => {
    return (
      <>
        <h2>blogs</h2>
        <span>{user.name ? user.name : user.username} logged in</span>
        <button onClick={handleLogout}>log out</button>
        <Togglable buttonLabel="new blog">
          <BlogForm createBlog={handleCreateBlog} />
        </Togglable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              blogs={blogs}
              setBlogs={setBlogs}
              key={blog.id}
              blog={blog}
              update={blogService.update}
              deleteBlog={blogService.deleteBlog}
            />
          ))}
      </>
    );
  };

  return (
    <div>
      {successMessage && (
        <Notification type="success" message={successMessage} />
      )}
      {errorMessage && <Notification type="error" message={errorMessage} />}
      {!user ? loginForm() : blogsDetails()}
    </div>
  );
};

export default App;
