import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import isValidUrl from '../utils/checkAvatarUrl';

type User = {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
};

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v: string) {
        return isEmail(v);
      },
      message: 'Неверно введён email'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v: string) {
        return isValidUrl(v);
      },
      message:
        'Ссылка на желаемый аватар пользователя, указана неверно, пожалуйста, проверьте формат ссылки'
    }
  }
});

export default mongoose.model<User>('user', userSchema);
