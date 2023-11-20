import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi, errors } from 'celebrate';
import usersRouter from './routes/user';
import cardsRouter from './routes/card';
import { SERVER_ERROR_STATUS } from './utils/constancies';
import loginUser from './controllers/login';
import { createUser } from './controllers/user';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';

require('dotenv').config();

const cookieParser = require('cookie-parser');

const { port = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required(),
        password: Joi.string().required()
      })
      .unknown(true)
  }),
  loginUser
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(200),
        avatar: Joi.string()
      })
      .unknown(true)
  }),
  createUser
);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req: Request, res: Response) => {
  res.status(404).send({ error: 'Страниица не найдена' });
});

app.use(errorLogger);

app.use(errors());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = SERVER_ERROR_STATUS, message } = err;
  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR_STATUS ? 'Ошибка сервера' : message
  });
});

app.listen(port);
