import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, update, setBlogs, blogs, deleteBlog }) => {
  const [open, setOpen] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showDetails = () => {
    setOpen(!open);
  };

  const increaseLike = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    const updatedBlog = await update(newBlog.id, newBlog);
    const newBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(newBlogs);
  };

  const deleteBlogById = async () => {
    if (window.confirm("Do you really want to delete this blog?")) {
      await deleteBlog(blog.id);
      const newBlogs = blogs.filter((el) => el.id !== blog.id);
      setBlogs(newBlogs);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <span data-testid="blog-title">{blog.title}</span>
        <span data-testid="blog-author">{blog.author}</span>
        <button data-testid="blog-expand-btn" onClick={showDetails}>
          {open ? "hide" : "view"}
        </button>
        {open && (
          <>
            <p data-testid={`blog-url-${blog.id}`}>{blog.url}</p>
            <span data-testid={`blog-likes-${blog.id}`}>{blog.likes}</span>
            <button
              data-testid={`blog-likes-counter-${blog.id}`}
              onClick={increaseLike}
            >
              like
            </button>
            <p>{blog.user.name ? blog.user.name : blog.user.username}</p>
            <button onClick={deleteBlogById}>remove</button>
          </>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blogs: PropTypes.array,
  setBlogs: PropTypes.func.isRequired,
  key: PropTypes.string,
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
