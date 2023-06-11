const { UNAUTHORIZED_ERR_CODE } = require('../constants');
const HttpError = require('./HttpError');

module.exports = class UnauthorizedError extends HttpError {
  constructor(message) {
    super(UNAUTHORIZED_ERR_CODE, message);
    this.name = 'UnauthorizedError';
  }
};
