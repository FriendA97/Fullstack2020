const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("METHOD: ", req.method);
  logger.info("PATH: ", req.path);
  logger.info("BODY:", req.body);
  logger.info("---");
  next();
};

const unkownEndpoint = (req, res) => {
  res.status(404).send({ error: "unkown endpoint" });
};

const errorHandler = (req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unkownEndpoint,
  errorHandler,
};
