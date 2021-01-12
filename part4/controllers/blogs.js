const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  return res.json(blogs);
});

blogsRouter.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    return res.json(blog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const token = req.token;
  const decodeToken = jwt.decode(token, process.env.SECRET_KEY);

  if (!token || !decodeToken.id) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const user = await User.findById(decodeToken.id);

  if (!body.title || !body.url) {
    return res.status(400).end();
  } else if (!body.likes) {
    body.likes = 0;
  }
  const blog = new Blog({
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    return res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const token = req.token;
    const blog = await Blog.findById(req.params.id);
    const decodeToken = jwt.decode(token, process.env.SECRET_KEY);

    if (!token || !decodeToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findById(decodeToken.id);

    if (blog.user.toString() === user._id.toString()) {
      const newUserBlogs = user.blogs.filter(
        (id) => id.toString() !== req.params.id
      );
      user.blogs = [...newUserBlogs];
      await user.save();
      await Blog.findByIdAndDelete(req.params.id);
      return res.status(204).end();
    }
  } catch (err) {
    next(err);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    return res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
