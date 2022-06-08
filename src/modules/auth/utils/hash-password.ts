import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, SALT_WORK_FACTOR);
  return hash;
}
