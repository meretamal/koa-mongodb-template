import { Schema, model } from 'mongoose';
import { IUser } from '@/interfaces/entities/user.entity';

const schema = new Schema<IUser>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = model<IUser>('User', schema);
