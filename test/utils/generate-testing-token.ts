import { prisma } from '@/prisma/client.prisma';
import { hashPassword } from '@/modules/auth/utils/hash-password';
import { generateToken } from '@/modules/auth/utils/generate-token';
import { userFactory } from '../factories/user.factory';

export async function generateTestingToken() {
  const user = await userFactory.build();
  const hashedPassword = await hashPassword(user.password);
  const createdUser = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });
  const token = await generateToken(createdUser);
  return {
    user: createdUser,
    token,
  };
}
