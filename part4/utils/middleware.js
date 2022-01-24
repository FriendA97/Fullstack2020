const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (req, res, next) => {
  logger.info("METHOD: ", req.method);
  logger.info("PATH: ", req.path);
  logger.info("BODY:", req.body);
  logger.info("---");
  next();
};

const tokenExtractor = (req, res, next) => {
  const token = req.get("Authorization");
  if (token && token.toLowerCase().startsWith("bearer")) {
    req.token = token.substring(7);
  }
  next();
};

const userExtractor = async (req, res, next) => {
  const token = req.token;
  if (req.method === "POST" || req.method === "PUT") {
    const decodeToken = jwt.decode(token, process.env.SECRET_KEY);
    if (!token || !decodeToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findById(decodeToken.id);
    req.user = user;
  }
  next();
};

const unkownEndpoint = (req, res) => {
  res.status(404).send({ error: "unkown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).send({ error: "Invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).send({ error: "Token has expired" });
  }
};

module.exports = {
  requestLogger,
  unkownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
