import { Prisma } from '@prisma/client';
import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';

export const userFactory = Factory.define<Prisma.UserCreateInput>(() => ({
  email: faker.internet.email(),
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: faker.internet.password(),
}));
