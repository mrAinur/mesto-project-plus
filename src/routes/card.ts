import {
  addLike,
  createCard,
  deleteLike,
  getCards,
  removeCard,
} from "../controllers/card";
import { Router } from "express";

const { celebrate, Joi } = require("celebrate");

const cardRouter = Router();

cardRouter.get("", getCards);
cardRouter.post(
  "",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        link: Joi.string().min(10).max(200),
      })
      .unknown(true),
  }),
  createCard
);
cardRouter.delete("/:cardId", removeCard);
cardRouter.put("/:cardId/likes", addLike);
cardRouter.delete("/:cardId/likes", deleteLike);

export default cardRouter;
