const { INTERNAL_ERROR, INTERNAL_SERVER_ERR_CODE } = require('../utils/constants');

module.exports.errorHandler = (error, req, res, next) => {
  const status = error.code || INTERNAL_SERVER_ERR_CODE;
  const message = error.message || INTERNAL_ERROR;
  res.status(status).send({ message });
  next();
};
