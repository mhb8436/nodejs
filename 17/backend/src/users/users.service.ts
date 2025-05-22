import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: import('../prisma/prisma.service').PrismaService) {}

  async create(createUserDto: import('./dto/create-user.dto').CreateUserDto) {
    const hashedPassword = await require('bcrypt').hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        nickname: createUserDto.nickname,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}

