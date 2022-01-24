const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const app = express();

logger.info("Connecting to ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("Error connecting to MongoDB", error.message));

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

//Controllers
app.use("/api/login", loginRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
