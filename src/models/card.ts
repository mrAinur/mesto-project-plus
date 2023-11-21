import mongoose from 'mongoose';
import isValidUrl from '../utils/checkAvatarUrl';

type Card = {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  createdAd: Date;
};

const cardSchema = new mongoose.Schema<Card>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v: string) {
        return isValidUrl(v);
      },
      message:
        'Ссылка на желаемую фотографию, указана неверно, пожалуйста, проверьте формат ссылки'
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      default: []
    }
  ],
  createdAd: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<Card>('card', cardSchema);
