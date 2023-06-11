const { CONFLICT_ERR_CODE } = require('../constants');
const HttpError = require('./HttpError');

module.exports = class ConflictError extends HttpError {
  constructor(message) {
    super(CONFLICT_ERR_CODE, message);
    this.name = 'ConflictError';
  }
};
