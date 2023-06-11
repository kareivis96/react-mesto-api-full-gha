const { FORBIDDEN_ERR_CODE } = require('../constants');
const HttpError = require('./HttpError');

module.exports = class ForbiddenError extends HttpError {
  constructor(message) {
    super(FORBIDDEN_ERR_CODE, message);
    this.name = 'ForbiddenError';
  }
};
