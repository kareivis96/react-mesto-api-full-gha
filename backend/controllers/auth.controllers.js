const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ConflictError = require('../utils/errors/ConflictError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const User = require('../models/user');
const {
  CREATED_CODE, AUTH_ERROR, USER_EXISTS, JWT_KEY,
} = require('../utils/constants');

module.exports.signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    let { password } = req.body;
    password = await bcrypt.hash(password, 10);

    const checkUser = await User.findOne({ email });
    if (checkUser) throw new ConflictError(USER_EXISTS);

    const user = await User.create({ ...req.body, email, password });
    res.status(CREATED_CODE).send(user.toObject({
      transform: (doc, response) => {
        delete response.password;
        return response;
      },
    }));
  } catch (err) {
    next(err);
  }
};

module.exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError(AUTH_ERROR);
    }

    const token = jwt.sign({ _id: user.id }, JWT_KEY);
    res.send({ data: token });
  } catch (err) {
    next(err);
  }
};
