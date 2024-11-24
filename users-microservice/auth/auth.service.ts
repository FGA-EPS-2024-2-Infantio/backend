import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/database/prisma.service'; // Se estiver usando Prisma

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserAuthorization(email: string): Promise<{ isAuthorized: boolean }> {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return { isAuthorized: false };
    }

    return { isAuthorized: true };
  }
}
