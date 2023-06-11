const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/error.middleware');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/winston.middleware');
const logger = require('./utils/logger');

const { PORT = 3000 } = process.env;
const app = express();

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/db');
  } catch (err) {
    logger.error(err);
    throw new Error('Не удалось подключиться к MongoDB');
  }
  logger.info('Connected to MongoDB');

  app.use(requestLogger);

  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });

  app.use('/', router);

  app.use(errorLogger);
  app.use(errors());
  app.use(errorHandler);

  app.listen(PORT, () => { logger.info(`Server started on port ${PORT}`); });
}

start();
