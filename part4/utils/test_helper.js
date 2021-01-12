const Blog = require("../models/blog");
const User = require("../models/user");

const initalBlogs = [
  {
    title: "A good book",
    author: "An Nguyen",
    url: "http://abcvvdav.com",
    likes: 10,
    id: "5ff8d4208f175a432474ea78",
  },
  {
    title: "A good book",
    author: "An Nguyen",
    url: "http://abcvvdav.com",
    likes: 10,
    id: "5ffb0b1749cce33bec41e86e",
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
