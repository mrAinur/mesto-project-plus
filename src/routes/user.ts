import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  editUserAvatar,
  editUserProfile,
  getUsers,
  getUserInfo
} from '../controllers/user';

const usersRouter = Router();

usersRouter.get(
  '',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required()
  }),
  getUsers
);
usersRouter.get(
  '/me',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required()
  }),
  getUserInfo
);
usersRouter.get(
  '/:userId',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required()
  }),
  getUserInfo
);
usersRouter.patch(
  '/me',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required(),
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(200)
      })
      .unknown(true)
  }),
  editUserProfile
);
usersRouter.patch(
  '/me/avatar',
  celebrate({
    headers: Joi.object()
      .keys({ Cookies: Joi.string() })
      .unknown(true)
      .required(),
    body: Joi.object().keys({ avatar: Joi.string() }).unknown(true)
  }),
  editUserAvatar
);

export default usersRouter;
