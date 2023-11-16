import { NextFunction, Request, Response } from 'express';
import User from '../models/user';

const NotFoundError = require('../errors/not-found-err');

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}, { __v: 0 })
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  User.findById(userId, { __v: 0 })
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден');
      res.send(user);
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

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id
      }))
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

const editUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, _id } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) =>
      res.send({
        name: user!.name,
        about: user!.about,
        avatar: user!.avatar,
        _id: user!._id
      }))
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

const editUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar, _id } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) =>
      res.send({
        name: user!.name,
        about: user!.about,
        avatar: user!.avatar,
        _id: user!._id
      }))
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

export {
  getUsers, getUser, createUser, editUserProfile, editUserAvatar
};
