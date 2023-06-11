const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { NO_TOKEN, BAD_TOKEN, JWT_KEY } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new UnauthorizedError(NO_TOKEN);
    if (!authorization.startsWith('Bearer ')) throw new UnauthorizedError(BAD_TOKEN);

    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_KEY);

    req.user = payload;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError(BAD_TOKEN));
    } else {
      next(err);
    }
  }
};
