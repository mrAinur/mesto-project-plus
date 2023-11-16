import mongoose from 'mongoose';

type User = {
  name: string;
  about: string;
  avatar: string;
};

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});

export default mongoose.model<User>('user', userSchema);
