import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
}
