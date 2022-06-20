import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/prisma/client.prisma';
import { userFactory } from '../factories/user.factory';

const BAD_REQUEST_EMPTY_EMAIL_ERROR = 'email is a required field';
const BAD_REQUEST_EMPTY_NAME_ERROR = 'name is a required field';
const BAD_REQUEST_EMPTY_LAST_NAME_ERROR = 'lastName is a required field';
const BAD_REQUEST_EMPTY_PASSWORD_ERROR = 'password is a required field';
const BAD_REQUEST_EMPTY_CONFIRM_PASSWORD_ERROR =
  'confirmPassword is a required field';
const BAD_REQUEST_INVALID_EMAIL_ERROR = 'email must be a valid email';
const BAD_REQUEST_PASSWORD_MISMATCH_ERROR = "passwords don't match";

describe('Auth', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({});
  });

  describe('POST /auth/sign-up', () => {
    it('should return a successful response', async () => {
      const user = userFactory.build();
      const response = await request(app.callback())
        .post('/auth/sign-up')
        .send({ ...user, confirmPassword: user.password });

      expect(response.status).toBe(201);

      const { password, ...userData } = user;
      expect(response.body).toMatchObject(userData);

      const createdUser = await prisma.user.findUnique({
        where: {
          id: response.body.id,
        },
      });
      expect(response.body).toEqual(createdUser);
    });

    it('should return a bad request response for blank data', async () => {
      const user = userFactory.build({
        email: '',
        name: '',
        lastName: '',
        password: '',
      });
      const response = await request(app.callback())
        .post('/auth/sign-up')
        .send({ ...user, confirmPassword: user.password });

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain(BAD_REQUEST_EMPTY_EMAIL_ERROR);
      expect(response.body.errors).toContain(BAD_REQUEST_EMPTY_NAME_ERROR);
      expect(response.body.errors).toContain(BAD_REQUEST_EMPTY_LAST_NAME_ERROR);
      expect(response.body.errors).toContain(BAD_REQUEST_EMPTY_PASSWORD_ERROR);
      expect(response.body.errors).toContain(
        BAD_REQUEST_EMPTY_CONFIRM_PASSWORD_ERROR,
      );
    });

    it('should return a bad request response for an invalid email', async () => {
      const user = userFactory.build({
        email: 'invalid email',
      });
      const response = await request(app.callback())
        .post('/auth/sign-up')
        .send({ ...user, confirmPassword: user.password });

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain(BAD_REQUEST_INVALID_EMAIL_ERROR);
    });

    it('should return a bad request response for mismatching passwords', async () => {
      const user = userFactory.build();
      const response = await request(app.callback())
        .post('/auth/sign-up')
        .send({ ...user, confirmPassword: 'wrong password' });

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain(
        BAD_REQUEST_PASSWORD_MISMATCH_ERROR,
      );
    });

    it('should return a conflict response', async () => {
      const user = userFactory.build();
      await prisma.user.create({ data: user });
      const response = await request(app.callback())
        .post('/auth/sign-up')
        .send({ ...user, confirmPassword: user.password });

      expect(response.status).toBe(409);
    });
  });
});
