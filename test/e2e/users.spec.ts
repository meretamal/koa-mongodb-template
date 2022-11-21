import request from 'supertest';
import { ObjectID } from 'bson';
import { app } from '@/app';
import { prisma } from '@/prisma/client.prisma';
import { userFactory } from '../factories/user.factory';
import { generateTestingToken } from '../utils/generate-testing-token';

const AUTHENTICATION_ERROR = 'Authentication Error';

describe('Users', () => {
  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  describe('GET /users', () => {
    it('should return a successful response', async () => {
      const { user, token } = await generateTestingToken();
      const createdUser = await prisma.user.create({
        data: userFactory.build(),
      });
      const response = await request(app.callback())
        .get('/users')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([user, createdUser]);
    });

    it('should return an unauthorized response', async () => {
      const response = await request(app.callback()).get('/users');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(AUTHENTICATION_ERROR);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a successful response', async () => {
      const { user, token } = await generateTestingToken();
      const response = await request(app.callback())
        .get(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(user);
    });

    it('should return an unauthorized response', async () => {
      const response = await request(app.callback()).get('/users/1');
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(AUTHENTICATION_ERROR);
    });

    it('should return a not found response', async () => {
      const objectId = new ObjectID();
      const { token } = await generateTestingToken();
      const response = await request(app.callback())
        .get(`/users/${objectId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.errors).toContain(
        `user with ObjectId ${objectId} does not exist`,
      );
    });

    it('should return a bad request response', async () => {
      const { token } = await generateTestingToken();
      const response = await request(app.callback())
        .get('/users/not-valid-object-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toContain(
        'not-valid-object-id must be a valid ObjectId',
      );
    });
  });
});
