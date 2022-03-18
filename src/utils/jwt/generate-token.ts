import { sign, SignOptions } from 'jsonwebtoken';
import { config } from '@/config';
import { IUser } from '@/interfaces/entities/user.entity';

export function generateToken(user: IUser) {
  return new Promise((resolve, reject) => {
    const options: SignOptions = {};
    if (config.jwtExpiration) {
      options.expiresIn = config.jwtExpiration;
    }
    sign({ sub: user.id }, config.jwtSecret, options, (err, token) =>
      err ? reject(err) : resolve(token),
    );
  });
}
