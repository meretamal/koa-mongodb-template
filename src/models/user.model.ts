import { Schema, model, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '@/interfaces/entities/user.entity';

const SALT_WORK_FACTOR = 10;

const schema = new Schema<IUser>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

schema.pre(
  'save',
  async function hashPassword(
    this: IUser,
    next: (err?: CallbackError | undefined) => void,
  ) {
    if (!this.isModified('password')) {
      return next();
    }
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hash;
    return next();
  },
);

schema.methods.comparePassword = function comparePassword(
  this: IUser,
  password: string,
) {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser>('User', schema);
