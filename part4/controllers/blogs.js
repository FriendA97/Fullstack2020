const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    return res.json(blogs);
  } catch (err) {
    next(err);
  }
};

const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    return res.json(blog);
  } catch (err) {
    next(err);
  }
};

const postBlog = async (req, res, next) => {
  try {
    const body = req.body;
    console.log(req.get("Authorization"));
    const user = req.user;

    if (!body.title || !body.url) {
      return res.status(400).end();
    } else if (!body.likes) {
      body.likes = 0;
    }
    const blog = new Blog({
      title: body.title,
      url: body.url,
      likes: body.likes,
      author: body.author,
      user: user._id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    return res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    const user = req.user;
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
};

const putBlog = async (req, res, next) => {
  try {
    const body = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    return res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

module.exports = { getBlogs, getBlogById, postBlog, deleteBlog, putBlog };
