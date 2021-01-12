const logger = require("./logger");

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
  }
};

module.exports = {
  requestLogger,
  unkownEndpoint,
  errorHandler,
  tokenExtractor,
};
