import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { tokenBearerStr, tokenSecretStr } from '../utils/constancies';
import NotAuthError from '../errors/not-auth-err';

const loginUser = (req: Request, res: Response, next: NextFunction) => {
  User.findOne({ email: req.body.email })
    .select('+password')
    .then((user) => {
      if (!user) throw new NotAuthError('Неправильные почта или пароль');
      return bcrypt
        .compare(req.body.password, user.password)
        .then((matched) => {
          if (!matched) throw new NotAuthError('Неправильные почта или пароль');
          const token = jwt.sign({ _id: user._id }, tokenSecretStr, {
            expiresIn: '7d'
          });
          res
            .cookie('jwt', `${tokenBearerStr}${token}`, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true
            })
            .end();
        });
    })
    .catch((err) => {
      if (err.name === 'TypeError') {
        throw new NotAuthError('Неправильные почта или пароль');
      } else {
        next(err);
      }
    })
    .catch(next);
};

export default loginUser;
