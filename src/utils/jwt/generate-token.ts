import { sign, SignOptions } from 'jsonwebtoken';
import { config } from '@/config';
import { IUser } from '@/interfaces/entities/user.entity';

export function generateToken(user: IUser) {
  return new Promise((resolve, reject) => {
    const options: SignOptions = {};
    if (config.jwt.expiration) {
      options.expiresIn = config.jwt.expiration;
    }
    sign({ sub: user.id }, config.jwt.secret, options, (err, token) =>
      err ? reject(err) : resolve(token),
    );
  });
}
