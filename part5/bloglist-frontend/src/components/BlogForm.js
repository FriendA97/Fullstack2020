import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    console.log(createBlog.mock.calls);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Create new blogs</h2>
      <form data-testid="blog-create-form" onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            data-testid="title-input"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="author"
            data-testid="author-input"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="text"
            data-testid="url-input"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button data-testid="create-blog-btn" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
