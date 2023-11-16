import { Router } from "express";
import {
  createUser,
  editUserAvatar,
  editUserProfile,
  getUser,
  getUsers
} from "../controllers/user";

const { celebrate, Joi } = require("celebrate");

const usersRouter = Router();

usersRouter.get("", getUsers);
usersRouter.get("/:userId", getUser);
usersRouter.post(
  "",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(200),
        avatar: Joi.string()
      })
      .unknown(true)
  }),
  createUser
);
usersRouter.patch(
  "/me",
  celebrate({
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
  "/me/avatar",
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string()
      })
      .unknown(true)
  }),
  editUserAvatar
);

export default usersRouter;
