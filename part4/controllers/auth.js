const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.findOne({ username: body.username });
    const passwordCorrect = user
      ? await bcrypt.compare(body.password, user.passwordHash)
      : false;
    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const loggedInUser = {
      username: user.username,
      id: user._id,
    };

    //token expires in 1 hour
    const token = jwt.sign(loggedInUser, process.env.SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    return res
      .status(200)
      .json({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
