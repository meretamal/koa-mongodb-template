import request from 'supertest';
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
});
