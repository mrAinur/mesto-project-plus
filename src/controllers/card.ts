import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-err';
import ForbiddenError from '../errors/forbidden-err';
import { BAD_REQUEST_STATUS } from '../utils/constancies';

const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({}, { __v: 0 })
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link, payloud } = req.body;
  Card.create({
    name,
    link,
    owner: payloud._id
  })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST_STATUS).send({
          error: err.message
        });
      } else {
        next(err);
      }
    });
};

const removeCard = async (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  await Card.findById(cardId)
    .populate('owner')
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка не найдена');
      if (card.owner._id.toString() !== req.body.payloud._id) {
        throw new ForbiddenError('Вы не можете удалить чужую карточку');
      }
    })
    .then(() => {
      Card.findByIdAndDelete(cardId).then((cardDel) => {
        res.send(cardDel);
      });
    })
    .catch(next);
};

const addLike = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.body.payloud._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Данная карточка не найдена');
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS).send({
          message: 'Невалидный идентификатор карточки'
        });
      } else {
        next(err);
      }
    });
};

const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.body.payloud._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Данная карточка не найдена');
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST_STATUS).send({
          message: 'Невалидный идентификатор карточки'
        });
      } else {
        next(err);
      }
    });
};

export {
  getCards, createCard, removeCard, addLike, deleteLike
};
