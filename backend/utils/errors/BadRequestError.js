const { BAD_REQUEST_ERR_CODE } = require('../constants');
const HttpError = require('./HttpError');

module.exports = class BadRequestError extends HttpError {
  constructor(message) {
    super(BAD_REQUEST_ERR_CODE, message);
    this.name = 'BadRequestError';
  }
};
