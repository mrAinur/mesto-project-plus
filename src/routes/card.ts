import { Router } from 'express';
import {
  addLike,
  createCard,
  deleteLike,
  getCards,
  removeCard
} from '../controllers/card';

const { celebrate, Joi } = require('celebrate');

const cardRouter = Router();

cardRouter.get(
  '',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required()
  }),
  getCards
);
cardRouter.post(
  '',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required(),
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        link: Joi.string()
      })
      .unknown(true)
  }),
  createCard
);
cardRouter.delete(
  '/:cardId',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required()
  }),
  removeCard
);
cardRouter.put(
  '/:cardId/likes',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required()
  }),
  addLike
);
cardRouter.delete(
  '/:cardId/likes',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required()
  }),
  deleteLike
);

export default cardRouter;
