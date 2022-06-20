import request from 'supertest';
import { app } from '@/app';
import { environment } from '@/config/environment';

describe('GET /', () => {
  it('should return a successful response', async () => {
    const response = await request(app.callback()).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: `${environment.app.name} API`,
    });
  });
});
