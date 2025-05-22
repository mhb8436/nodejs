import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, require('../prisma/prisma.service').PrismaService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
