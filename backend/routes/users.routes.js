const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const usersControllers = require('../controllers/users.controllers');

router.get('/', usersControllers.getUsers);
router.get('/me', usersControllers.getMe);

router.get('/:id', celebrate({
  params: {
    id: Joi.string().length(24).hex(),
  },
}), usersControllers.getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    about: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
}), usersControllers.patchUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
  }),
}), usersControllers.patchUserAvatar);

module.exports = router;
