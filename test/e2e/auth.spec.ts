import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/prisma/client.prisma';
import { hashPassword } from '@/modules/auth/utils/hash-password';
import { userFactory } from '../factories/user.factory';

const BAD_REQUEST_EMPTY_EMAIL_ERROR = 'email is a required field';
const BAD_REQUEST_EMPTY_NAME_ERROR = 'name is a required field';
const BAD_REQUEST_EMPTY_LAST_NAME_ERROR = 'lastName is a required field';
const BAD_REQUEST_EMPTY_PASSWORD_ERROR = 'password is a required field';
const BAD_REQUEST_EMPTY_CONFIRM_PASSWORD_ERROR =
  'confirmPassword is a required field';
const BAD_REQUEST_INVALID_EMAIL_ERROR = 'email must be a valid email';
const BAD_REQUEST_PASSWORD_MISMATCH_ERROR = "passwords don't match";
const UNAUTHORIZED_INCORRECT_PASSWORD_ERROR = 'incorrect password';

describe('Auth', () => {
  afterEach(async () => {
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

  describe('POST /auth/sign-in', () => {
    it('should return a successful response', async () => {
      const user = userFactory.build();
      const hashedPassword = await hashPassword(user.password);
      await prisma.user.create({ data: { ...user, password: hashedPassword } });
      const response = await request(app.callback())
        .post('/auth/sign-in')
        .send({ email: user.email, password: user.password });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('type');
    });

    it('should return a bad request response for blank data', async () => {
      const response = await request(app.callback()).post('/auth/sign-in');

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain(BAD_REQUEST_EMPTY_EMAIL_ERROR);
      expect(response.body.errors).toContain(BAD_REQUEST_EMPTY_PASSWORD_ERROR);
    });

    it('should return a bad request response for an invalid email', async () => {
      const response = await request(app.callback())
        .post('/auth/sign-in')
        .send({ email: 'invalid email', password: 'testpasword' });

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain(BAD_REQUEST_INVALID_EMAIL_ERROR);
    });

    it('should return a not found response for a non existing email', async () => {
      const user = userFactory.build({
        email: 'savedemail@test.com',
      });
      const hashedPassword = await hashPassword(user.password);
      await prisma.user.create({ data: { ...user, password: hashedPassword } });
      const response = await request(app.callback())
        .post('/auth/sign-in')
        .send({ email: 'notsavedemail@test.com', password: user.password });

      expect(response.status).toBe(404);
    });

    it('it should return an unauthorized response for a wrong password', async () => {
      const user = userFactory.build({
        password: 'mypassword',
      });
      const hashedPassword = await hashPassword(user.password);
      await prisma.user.create({ data: { ...user, password: hashedPassword } });
      const response = await request(app.callback())
        .post('/auth/sign-in')
        .send({ email: user.email, password: 'notmypassword' });

      expect(response.status).toBe(401);
      expect(response.body.errors).toContain(
        UNAUTHORIZED_INCORRECT_PASSWORD_ERROR,
      );
    });
  });
});
