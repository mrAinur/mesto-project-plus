import { NextFunction } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';

const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const checkCard = async (
  cardId: string,
  _id: mongoose.Types.ObjectId,
  next: NextFunction
) => {
  await Card.findById(cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Данная карточка не найдена');
      if (card.owner !== _id) {
        throw new ForbiddenError('Вы не можете удалять чужие карточки');
      }
    })
    .catch(next);
};

export default checkCard;
