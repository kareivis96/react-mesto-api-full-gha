const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const cardsControllers = require('../controllers/cards.controllers');

const objectIDvalidator = celebrate({
  params: {
    cardId: Joi.string().length(24).hex(),
  },
});

router.get('/', cardsControllers.getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({
      scheme: [
        'http',
        'https',
      ],
    }),
  }),
}), cardsControllers.createCard);
router.delete('/:cardId', objectIDvalidator, cardsControllers.deleteCard);
router.put('/:cardId/likes', objectIDvalidator, cardsControllers.likeCard);
router.delete('/:cardId/likes', objectIDvalidator, cardsControllers.dislikeCard);

module.exports = router;
