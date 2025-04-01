import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { PrismaService } from './prisma.service';

@Module({
  providers: [TodoService, TodoResolver, PrismaService],
})
export class TodoModule {}
