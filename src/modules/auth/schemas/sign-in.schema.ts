import { object, string } from 'yup';

export const signInSchema = object({
  email: string().email().required(),
  password: string().required(),
});
