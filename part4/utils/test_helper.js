const Blog = require("../models/blog");
const User = require("../models/user");

const initalBlogs = [
  {
    title: "A good book",
    author: "An Nguyen",
    url: "http://abcvvdav.com",
    likes: 0,
  },
  {
    title: "abc",
    author: "An Nguyen",
    url: "www.google.com",
    likes: 5,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = { initalBlogs, blogsInDb, usersInDb };
