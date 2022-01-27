import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, update, setBlogs, blogs, index, deleteBlog }) => {
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
    <div data-testid={`blog-${index}`} style={blogStyle}>
      <div>
        <span data-testid={`blog-title-${blog.title}`}>{blog.title}</span>
        <span data-testid="blog-author">{blog.author}</span>
        <button data-testid={`blog-expand-btn-${index}`} onClick={showDetails}>
          {open ? "hide" : "view"}
        </button>
        {open && (
          <>
            <p data-testid={`blog-url-${index}`}>{blog.url}</p>
            <span data-testid={`blog-likes-${index}`}>{blog.likes}</span>
            <button
              data-testid={`blog-like-counter-${index}`}
              onClick={increaseLike}
            >
              like
            </button>
            <p>{blog.user.name ? blog.user.name : blog.user.username}</p>
            <button
              data-testid={`blog-delete-${index}`}
              onClick={deleteBlogById}
            >
              remove
            </button>
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
  index: PropTypes.number.isRequired,
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
