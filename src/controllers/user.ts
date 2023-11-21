import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { BAD_REQUEST_STATUS } from '../utils/constancies';
import NotFoundError from '../errors/not-found-err';
import ConflictError from '../errors/conflict-err';
import NotValidData from '../errors/not-valid-err';

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}, { __v: 0 })
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (userId: string, res: Response, next: NextFunction) => {
  User.findById(userId, { __v: 0 })
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден');
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValidData('Невалидный идентификатор пользователя'));
      } else {
        next(err);
      }
    });
};

const getAuthUserInfo = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.body.payloud._id, { __v: 0 })
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователь не найден');
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotValidData('Невалидный идентификатор пользователя'));
      } else {
        next(err);
      }
    });
};

const getUserInfo = (req: Request, res: Response, next: NextFunction) => {
  req.params.id
    ? getUser(req.params.id, res, next)
    : getAuthUserInfo(req, res, next);
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({ ...req.body, password: hash })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.code === 11000 || err.name === 'ValidationError') {
          next(
            new ConflictError(
              'Данная почта уже зарегистрирована, используйте другую'
            )
          );
        } else {
          next(err);
        }
      });
  });
};

const editUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, payloud } = req.body;
  User.findByIdAndUpdate(
    payloud._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidData(err.message));
      } else {
        next(err);
      }
    });
};

const editUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar, payloud } = req.body;
  User.findByIdAndUpdate(
    payloud._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new NotValidData(err.message));
      } else {
        next(err);
      }
    });
};

export { getUsers, createUser, editUserProfile, editUserAvatar, getUserInfo };
