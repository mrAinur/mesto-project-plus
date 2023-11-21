import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-err';
import ForbiddenError from '../errors/forbidden-err';
import NotValidData from '../errors/not-valid-err';

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
        next(new NotValidData(err.message));
      } else {
        next(err);
      }
    });
};

const removeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .populate('owner', '_id')
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
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    });
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
        next(new NotValidData('Невалидный идентификатор карточки'));
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
        next(new NotValidData('Невалидный идентификатор карточки'));
      } else {
        next(err);
      }
    });
};

export { getCards, createCard, removeCard, addLike, deleteLike };
