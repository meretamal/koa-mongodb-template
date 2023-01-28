import { Prisma } from '@prisma/client';
import { prisma } from '@/prisma/client.prisma';

export class UsersRepository {
  static create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  static findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static findAll() {
    return prisma.user.findMany();
  }

  static update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  static delete(id: string) {
    return prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
