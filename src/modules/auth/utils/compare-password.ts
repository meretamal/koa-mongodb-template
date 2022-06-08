import bcrypt from 'bcrypt';

export function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
