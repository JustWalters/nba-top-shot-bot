const winston = require('winston');

require('dotenv').config();

const { NODE_ENV, LOG_LEVEL } = process.env;

const logLevel =
  // eslint-disable-next-line no-nested-ternary
  LOG_LEVEL === 'undefined'
    ? NODE_ENV === 'production'
      ? 'info'
      : 'silly'
    : LOG_LEVEL;

const logger = winston.createLogger({
  level: logLevel,
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});

module.exports = logger;
