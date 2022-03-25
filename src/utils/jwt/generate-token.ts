import { sign, SignOptions } from 'jsonwebtoken';
import { environment } from '@/config/environment';
import { IUser } from '@/interfaces/entities/user.entity';

export function generateToken(user: IUser) {
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
