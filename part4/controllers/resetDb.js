const Blog = require("../models/blog");
const User = require("../models/user");

const resetDb = async (req, res, next) => {
  try {
    await Blog.deleteMany({});
    await User.deleteMany({});
    return res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = resetDb;
