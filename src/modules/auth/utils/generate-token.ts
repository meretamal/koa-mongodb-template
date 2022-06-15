import { sign, SignOptions } from 'jsonwebtoken';
import { User } from '@prisma/client';
import { environment } from '@/config/environment';

export function generateToken(user: User) {
  return new Promise((resolve, reject) => {
    const options: SignOptions = {};
    if (environment.jwt.expiration) {
      options.expiresIn = environment.jwt.expiration;
    }
    sign({ sub: user.id }, environment.jwt.secret, options, (err, token) =>
      err ? reject(err) : resolve(token),
    );
  });
}
