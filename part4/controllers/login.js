const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();

loginRouter.post("/", async (req, res, next) => {
  const body = req.body;
  try {
    const user = await User.findOne({ username: body.username });

    const passwordCorrect = user
      ? await bcrypt.compare(body.password, user.passwordHash)
      : false;

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET_KEY);

    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
