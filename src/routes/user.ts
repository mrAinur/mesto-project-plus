import {
  createUser,
  editUserAvatar,
  editUserProfile,
  getUser,
  getUsers,
} from "../controllers/user";
import { Router } from "express";

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
        avatar: Joi.string().min(10).max(200),
      })
      .unknown(true),
  }),
  createUser
);
usersRouter.patch(
  "/me",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(200),
      })
      .unknown(true),
  }),
  editUserProfile
);
usersRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().min(10),
      })
      .unknown(true),
  }),
  editUserAvatar
);

export default usersRouter;
