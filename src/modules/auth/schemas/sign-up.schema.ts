import { object, string, ref } from 'yup';

export const signUpSchema = object({
  name: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string()
    .required()
    .oneOf([ref('password'), null], "passwords don't match"),
});
