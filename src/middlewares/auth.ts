import { NextFunction, Request, Response } from 'express';
import jwtMethod from 'jsonwebtoken';
import {
  UNAUTHORIZED_STATUS,
  tokenBearerStr,
  tokenSecretStr
} from '../utils/constancies';

export default (req: Request, res: Response, next: NextFunction) => {
  const { jwt } = req.cookies;
  if (!jwt || !jwt.startsWith(tokenBearerStr)) {
    return res
      .status(UNAUTHORIZED_STATUS)
      .send({ message: 'необходима авторизация' });
  }
  const token = jwt.replace(tokenBearerStr, '');
  let payloud;
  try {
    payloud = jwtMethod.verify(token, tokenSecretStr);
  } catch (err) {
    return res
      .status(UNAUTHORIZED_STATUS)
      .send({ message: 'необходима авторизация' });
  }
  req.body = { ...req.body, payloud };
  return next();
};
