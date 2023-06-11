const { NOT_FOUND_ERR_CODE } = require('../constants');
const HttpError = require('./HttpError');

module.exports = class NotFoundError extends HttpError {
  constructor(message) {
    super(NOT_FOUND_ERR_CODE, message);
    this.name = 'NotFoundError';
  }
};
