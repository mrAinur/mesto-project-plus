import { NextFunction, Request, Response } from 'express';
import jwtMethod from 'jsonwebtoken';
import { tokenBearerStr, tokenSecretStr } from '../utils/constancies';
import NotAuthError from '../errors/not-auth-err';

export default (req: Request, res: Response, next: NextFunction) => {
  const { jwt } = req.cookies;
  if (!jwt || !jwt.startsWith(tokenBearerStr)) {
    return next(new NotAuthError('необходима авторизация'));
  }
  const token = jwt.replace(tokenBearerStr, '');
  let payloud;
  try {
    payloud = jwtMethod.verify(token, tokenSecretStr);
  } catch (err) {
    return next(new NotAuthError('необходима авторизация'));
  }
  req.body = { ...req.body, payloud };
  return next();
};
