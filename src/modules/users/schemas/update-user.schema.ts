import { object, string } from 'yup';

export const udpateUserSchema = object({
  name: string(),
  lastName: string(),
});
