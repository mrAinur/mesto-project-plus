import { NextFunction, Request, Response } from "express";
import User from "../models/user";

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({}, { __v: 0 })
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (req: Request, res: Response) => {
  const { userId } = req.params;
  User.findById(userId, { __v: 0 })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({
          message: "Невалидный идентификатор карточки"
        });
      }
    });
};

const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) =>
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          error: err.message
        });
      }
    });
};

const editUserProfile = (req: Request, res: Response) => {
  const { name, about, _id } = req.body;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) =>
      res.send({
        name: user!.name,
        about: user!.about,
        avatar: user!.avatar,
        _id: user!._id
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          error: err.message
        });
      }
    });
};

const editUserAvatar = (req: Request, res: Response) => {
  const { avatar, _id } = req.body;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) =>
      res.send({
        name: user!.name,
        about: user!.about,
        avatar: user!.avatar,
        _id: user!._id
      })
    )
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          error: err.message
        });
      }
    });
};

export {
  getUsers, getUser, createUser, editUserProfile, editUserAvatar
};
