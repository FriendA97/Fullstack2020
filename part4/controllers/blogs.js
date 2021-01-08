const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs));
});

blogRouter.post("/", (req, res, next) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((savedBlog) => res.status(201).json(savedBlog))
    .catch((err) => next(err));
});

module.exports = blogRouter;
