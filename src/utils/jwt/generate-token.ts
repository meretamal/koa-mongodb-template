import { sign } from 'jsonwebtoken';
import { config } from '@/config';
import { IUser } from '@/interfaces/entities/user.entity';

export function generateToken(user: IUser) {
  return new Promise((resolve, reject) => {
    sign({ sub: user.id }, config.jwtSecret, {}, (err, token) =>
      err ? reject(err) : resolve(token),
    );
  });
}
