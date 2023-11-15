import User from "../models/user";
import { NextFunction, Request, Response } from "express";

const NotFoundError = require("../errors/not-found-err");

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}, { __v: 0 })
    .then((users) => {
      if (!users)
        throw new NotFoundError("Запрашиваемые пользователи не найдены");
      res.send(users);
    })
    .catch(next);
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  User.findById(userId, { __v: 0 })
    .then((user) => {
      if (!user)
        throw new NotFoundError("Запрашиваемый пользователь не найден");
      res.send(user);
    })
    .catch(next);
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      })
    )
    .catch(next);
};

const editUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, _id } = req.body;
  User.findByIdAndUpdate(_id, { name, about }, { new: true })
    .then((user) =>
      res.send({
        name: user!.name,
        about: user!.about,
        avatar: user!.avatar,
        _id: user!._id,
      })
    )
    .catch(next);
};

const editUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar, _id } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true })
    .then((user) =>
      res.send({
        name: user!.name,
        about: user!.about,
        avatar: user!.avatar,
        _id: user!._id,
      })
    )
    .catch(next);
};

export { getUsers, getUser, createUser, editUserProfile, editUserAvatar };
