const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  res.json(users);
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const existedUser = await User.find({ username: body.username });
    if (
      !body.username ||
      !body.password ||
      body.username.length < 3 ||
      body.password.length < 3
    ) {
      return res.status(400).send({ error: "Invalid username or password" });
    } else if (existedUser[0]) {
      return res.status(400).send({ error: "Username has been taken" });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const newUser = new User({
      name: body.name,
      username: body.username,
      passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
