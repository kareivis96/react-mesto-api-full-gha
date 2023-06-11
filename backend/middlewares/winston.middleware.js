const winston = require('winston');
const expressWinston = require('express-winston');

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: winston.format.cli(),
    }),
    new winston.transports.File({
      filename: 'request.log',
      format: winston.format.json(),
      maxFiles: 6,
      maxsize: 8 * 1024 * 1024 * 8,
    }),
  ],
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.cli(),
    }),
    new winston.transports.File({
      filename: 'error.log',
      format: winston.format.json(),
      maxFiles: 6,
      maxsize: 8 * 1024 * 1024 * 8,
    }),
  ],
});
