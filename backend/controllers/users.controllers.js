const CastError = require('mongoose/lib/error/cast');
const MongooseError = require('mongoose/lib/error/mongooseError');
const User = require('../models/user');
const { USER_NOT_FOUND } = require('../utils/constants');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

module.exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user === null) throw new NotFoundError(USER_NOT_FOUND);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new NotFoundError(USER_NOT_FOUND);
    res.send({ data: user });
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

async function patchUser(req, res, next) {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new NotFoundError(USER_NOT_FOUND);
    res.send(user);
  } catch (err) {
    if (err instanceof MongooseError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
}

module.exports.patchUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  req.body = { name, about };
  return patchUser(req, res, next);
};

module.exports.patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  req.body = { avatar };
  return patchUser(req, res, next);
};
