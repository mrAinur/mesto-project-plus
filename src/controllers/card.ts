import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';

const NotFoundError = require('../errors/not-found-err');

const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({}, { __v: 0 })
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link, _id } = req.body;
  Card.create({
    name,
    link,
    owner: _id
  })
    .then((card) => {
      res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        likes: card.likes,
        createdAd: card.createdAd,
        _id: card._id
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          error: err.message
        });
      } else {
        next('Default error');
      }
    });
};

const removeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Данная карточка не найдена');
      res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        likes: card.likes,
        createdAd: card.createdAd,
        _id: card._id
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Невалидный идентификатор карточки'
        });
      } else {
        next('Default error');
      }
    });
};

const addLike = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.body._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Данная карточка не найдена');
      res.send({
        name: card!.name,
        link: card!.link,
        owner: card!.owner,
        likes: card!.likes,
        createdAd: card!.createdAd,
        _id: card!._id
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Невалидный идентификатор карточки'
        });
      } else {
        next('Default error');
      }
    });
};

const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.body._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) throw new NotFoundError('Данная карточка не найдена');
      res.send({
        name: card!.name,
        link: card!.link,
        owner: card!.owner,
        likes: card!.likes,
        createdAd: card!.createdAd,
        _id: card!._id
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Невалидный идентификатор карточки'
        });
      } else {
        next('Default error');
      }
    });
};

export {
  getCards, createCard, removeCard, addLike, deleteLike
};
