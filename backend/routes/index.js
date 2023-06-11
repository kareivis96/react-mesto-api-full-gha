const router = require('express').Router();
const userRouter = require('./users.routes');
const cardRouter = require('./cards.routes');
const authRouter = require('./auth.routes');
const NotFoundError = require('../utils/errors/NotFoundError');
const { PAGE_NOT_FOUND } = require('../utils/constants');
const { auth } = require('../middlewares/auth.middleware');

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND)));

module.exports = router;
